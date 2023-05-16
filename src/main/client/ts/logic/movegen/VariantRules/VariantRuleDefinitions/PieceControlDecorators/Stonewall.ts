import { PieceControl } from "../../../PieceControl/PieceControl";
import { AttackType, PieceControlConfiguration } from "../../../PieceControl/PieceControlInterface";
import { VariantRule } from "../../VariantRule";
import type { VariantRuleHandler } from "../../VariantRuleInterface";

const tag = "stonewall";
export class Stonewall extends VariantRule<typeof PieceControl, typeof tag> implements VariantRuleHandler<PieceControl> {
	static {
		VariantRule.initVariantRule(Stonewall);
	}

	getDecoratorType() {
		return PieceControl;
	}

	getPublicProperties() {
		return {
			parameterValue: true,
			information: {
				name: "Stonewall",
				textualForm: "",
				description: "Dead pieces cannot be captured",
				tag
			}
		} as const;
	}

	matchesPGNDeclaration(match: string): boolean {
		return /^Deadwall$/i.test(match);
	}

	serializeToParsingForm(): string {
		return "Deadwall";
	}

	isDisabled(): boolean {
		return false;
	}

	getMovePossibility(configuration: PieceControlConfiguration): boolean {
		const {
			displacement: [i, j],
			special
		} = configuration;
		let modifiedConfiguration = configuration;

		if (
			(special === AttackType.AttackOnly || special === AttackType.Normal || special === AttackType.RayGen) &&
			this.decorator.board[i] &&
			this.decorator.board[i][j] &&
			this.decorator.board[i][j].isDead()
		) {
			modifiedConfiguration = {
				...configuration,
				special: AttackType.MoveOnly
			};
		}

		for (const decorator of this.wrappingDecorators) {
			if (decorator.getMovePossibility) return decorator.getMovePossibility(configuration);
		}
		return PieceControl.prototype.getMovePossibility.call(this.decorator, modifiedConfiguration);
	}
}
