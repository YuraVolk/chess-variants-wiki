declare module "*.module.css" {
	const classes: Record<string, string>;
	export default classes;
}

declare module "*.module.scss" {
	const classes: Record<string, string>;
	export default classes;
}

declare module "*.module.sass" {
	const classes: Record<string, string>;
	export default classes;
}

declare module "*.module.less" {
	const classes: Record<string, string>;
	export default classes;
}

declare module "*.module.styl" {
	const classes: Record<string, string>;
	export default classes;
}

declare module "*.svg" {
	const content: string;
	export default content;
}

declare namespace JSX {
	interface IntrinsicElements {
		accordion: React.ComponentType;
		"board-display": React.ComponentType;
		"composites-display": React.ComponentType;
		"percentage-display": React.ComponentType;
		"game-controller": React.ComponentType;
		sidebar: React.ComponentType;
	}
}

interface Array<T> {
	reverse(): { [K in keyof this]: T };
}

interface ArrayConstructor {
	isArray(arg: unknown): arg is unknown[];
}

interface String {
	toUpperCase<T extends string>(this: T): Uppercase<T>;
	toLowerCase<T extends string>(this: T): Lowercase<T>;
}
