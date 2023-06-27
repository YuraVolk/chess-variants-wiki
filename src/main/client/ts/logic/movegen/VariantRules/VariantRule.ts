import { copyClass } from "@client/ts/utils/ObjectUtils";
import { verifyFunctionType, importAll, FunctionType, assertDevOnly } from "../../../baseTypes";
import type {
	AllowedSuperClasses,
	VariantDataRules,
	VariantRuleInformation,
	VariantRuleHandler,
	AllowedHandlerClasses,
	VariantRuleAllowedChecks
} from "./VariantRuleInterface";

export interface VariantRulePublicProperties<K extends keyof VariantDataRules> {
	readonly information: VariantRuleInformation<K>;
	readonly parameterValue: VariantDataRules[K];
}

const verifyHandlerProperty = <C extends AllowedSuperClasses>(
	handler: VariantRuleHandler<InstanceType<C>>,
	key: PropertyKey
): key is keyof typeof handler => key in handler;
const verifyPrototypeProperty = <C extends AllowedSuperClasses>(
	superClass: C,
	key: PropertyKey
): key is keyof AllowedSuperClasses["prototype"] => key in superClass.prototype;

export abstract class VariantRule<C extends AllowedSuperClasses, K extends keyof VariantDataRules> {
	declare ["constructor"]: new (...args: unknown[]) => VariantRule<C, K>;

	readonly dependencies = new Map<new (...args: unknown[]) => VariantRule<AllowedSuperClasses, keyof VariantDataRules>, unknown[]>();
	static readonly variantRuleList: Array<
		new (...args: unknown[]) => VariantRule<AllowedSuperClasses, keyof VariantDataRules> & VariantRuleHandler<AllowedHandlerClasses>
	> = [];
	protected static initVariantRule(
		rv: new (...args: unknown[]) => VariantRule<AllowedSuperClasses, keyof VariantDataRules> & VariantRuleHandler<AllowedHandlerClasses>
	) {
		VariantRule.variantRuleList.push(rv);
	}
	protected decorator!: InstanceType<C>;
	protected wrappingDecorators: Array<VariantRuleHandler<InstanceType<C>>> = [];

	initializeBaseHandler(handler: InstanceType<C>) {
		this.decorator = handler;
	}

	initializeWrappingHandler(handler: VariantRule<C, keyof VariantDataRules> & VariantRuleHandler<InstanceType<C>>) {
		this.wrappingDecorators.push(handler);
	}

	injectIntoBaseClass(callback: (this: InstanceType<C>) => void) {
		return callback.bind(this.decorator);
	}

	callHandler<K extends keyof this & keyof InstanceType<C>>(
		method: K,
		args: IArguments
	): this[K] extends FunctionType ? ReturnType<this[K]> : never {
		for (const decorator of this.wrappingDecorators) {
			if (!verifyHandlerProperty(decorator, method)) continue;
			const decoratorMethod = decorator[method];
			assertDevOnly(verifyFunctionType(decoratorMethod));
			return decoratorMethod.call(decorator, ...args);
		}

		const decoratorType: C = this.getDecoratorType();
		assertDevOnly(verifyPrototypeProperty(decoratorType, method));
		const prototypeMethod: unknown = decoratorType.prototype[method];
		assertDevOnly(verifyFunctionType(prototypeMethod));
		return prototypeMethod.call(this.decorator, ...args);
	}

	abstract matchesPGNDeclaration(match: string): boolean;
	abstract getPublicProperties(): VariantRulePublicProperties<K>;
	abstract getDecoratorType(): C;
	abstract serializeToParsingForm(): string;
	abstract isDisabled(parameters: VariantRuleAllowedChecks): boolean;
	getParametrizedOptions?(): VariantDataRules[K] extends boolean ? never : Map<string, VariantDataRules[K]>;

	getInsufficientMaterialData() {
		return {
			isPartiallyDisabled: false,
			isDisabled: false
		};
	}
}

const objectPrototype = new Set(Reflect.ownKeys(Reflect.getPrototypeOf({}) ?? []));
export function decorateClassWithVariants<C extends AllowedSuperClasses>(
	baseClass: InstanceType<C>,
	classReference: new (...args: ConstructorParameters<C>) => InstanceType<C>,
	variants: Array<VariantRule<C, keyof VariantDataRules> & VariantRuleHandler<InstanceType<C>>>
): InstanceType<C> {
	if (variants.length === 0) return baseClass;

	const decoratorProperties = copyClass(baseClass, classReference, true);
	const methods = new Set<keyof InstanceType<C>>();
	decoratorProperties.initDecoratorSettings = () => {
		// Do nothing, this method only exists for the purpose of being overridden
	};
	methods.add("initDecoratorSettings");
	const lastInheritedMethods = new Set<string | symbol>();

	let basePrototype: object | null = null;
	const verifyKeyInDecoratorProperties = (k: PropertyKey): k is keyof InstanceType<C> =>
		typeof k !== "number" && k in decoratorProperties && !objectPrototype.has(k) && !lastInheritedMethods.has(k);
	while ((basePrototype = Reflect.getPrototypeOf(basePrototype ?? baseClass))) {
		Reflect.ownKeys(basePrototype).forEach((k) => {
			if (verifyKeyInDecoratorProperties(k)) {
				decoratorProperties[k] = baseClass[k];
				methods.add(k);
				lastInheritedMethods.add(k);
			}
		});
	}

	const verifyOwnProperty = (k: PropertyKey): k is keyof InstanceType<C> => k in baseClass;
	for (const property of Object.getOwnPropertyNames(baseClass)) {
		if (!verifyOwnProperty(property)) throw new Error("Expected prototype to not be overridden");

		const localProperty = property;
		Object.defineProperty(decoratorProperties, property, {
			get: function (): (typeof baseClass)[keyof typeof baseClass] {
				return baseClass[localProperty];
			},
			set: function (v: InstanceType<C>[string & keyof InstanceType<C>]) {
				baseClass[localProperty] = v;
			},
			enumerable: true,
			configurable: false
		});
	}
	decoratorProperties.__baseClass = baseClass;

	for (const method of methods) {
		const variantRuleChain = variants.filter((rv) => method in rv);
		if (variantRuleChain.length === 0) continue;
		variantRuleChain[0].initializeBaseHandler(decoratorProperties);
		const variantDecorator = variantRuleChain.reduce((p, c) => {
			c.initializeBaseHandler(decoratorProperties);
			c.initializeWrappingHandler(p);
			return c;
		});

		if (method in decoratorProperties) {
			const variant = Reflect.get(variantDecorator, method);
			if (typeof variant === "function") {
				const variantFunc = variant;
				if (verifyFunctionType(decoratorProperties[method])) {
					Object.defineProperty(decoratorProperties, method, {
						value: (...args: unknown[]) => {
							return variantFunc.bind(variantDecorator)(...args);
						},
						enumerable: false,
						writable: false,
						configurable: false
					});
				}
			}
		}
	}

	decoratorProperties.initDecoratorSettings();
	return decoratorProperties;
}

importAll(require.context("./VariantRuleDefinitions", true, /\.ts$/));
