import { createTuple } from "@client/ts/baseTypes";
import type { PlayerBooleanTuple } from "@moveGeneration/Board/Board";
import { totalPlayers } from "@moveGeneration/GameInformation/GameData";
import type { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { initializeBoardSquares } from "../../BaseInterfaces";
import type { FENData } from "../FENData/FENData";
import { emptyPieceString, PieceString } from "../GameInformation/GameUnits/PieceString";
import { decorateClassWithVariants, VariantRule } from "../VariantRules/VariantRule";
import type { VariantDataRules } from "../VariantRules/VariantRuleInterface";
import { copyVariantRules } from "../VariantRules/VariantRuleSetup";
import { PieceControl } from "./PieceControl";
import { PieceLetter, pieceControlConfigSettings, ControlConfiguration } from "./PieceControlInterface";

export class PieceControlConfigurator {
	private readonly _control: PieceControl;
	private readonly _isConfigured: ControlConfiguration;
	constructor(control: PieceControl) {
		this._control = control;
		this._isConfigured = {
			coordinates: [0, 0],
			board: initializeBoardSquares(() => emptyPieceString),
			immunePieces: createTuple(false, totalPlayers),
			color: 0
		};
	}

	setCoordinates(x: number, y: number) {
		this._isConfigured.coordinates = [x, y];
		return this;
	}
	setBaseImmunePieces(immune: PlayerBooleanTuple) {
		this._isConfigured.immunePieces = immune;
		return this;
	}
	setColor(color: NumericColor) {
		this._isConfigured.color = color;
		return this;
	}
	setBoard(board: PieceString[][]) {
		this._isConfigured.board = board;
		return this;
	}

	constructPieceControl(): PieceControl {
		this._control.configure(this._isConfigured);
		return this._control;
	}
}

export class PieceControlBuilder {
	private readonly _generalConfig: {
		fenData?: FENData;
		variantRules?: Array<VariantRule<typeof PieceControl, keyof VariantDataRules>>;
	};
	constructor() {
		this._generalConfig = {};
	}

	setFENData(fenData: FENData) {
		this._generalConfig.fenData = fenData;
	}
	setVariantRules<T extends VariantRule<typeof PieceControl, keyof VariantDataRules>>(rules: T[]) {
		this._generalConfig.variantRules = rules;
	}
	createPieceControlWrap(letter: PieceLetter): () => PieceControlConfigurator {
		const information = pieceControlConfigSettings[letter];
		const control = new information.construct();
		if (!this._generalConfig.fenData || !this._generalConfig.variantRules) throw new Error("PieceControl builder setup is not complete");
		control.setFENData(this._generalConfig.fenData);

		const decoratedControl = decorateClassWithVariants<typeof PieceControl>(
			control,
			PieceControl,
			copyVariantRules(this._generalConfig.variantRules)
		);

		return () => {
			return new PieceControlConfigurator(decoratedControl);
		};
	}
}
