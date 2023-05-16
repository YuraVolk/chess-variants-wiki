import type { Board } from "@moveGeneration/Board/Board";
import type { GameData } from "@moveGeneration/GameInformation/GameData";
import { nonPlayablePieces } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import type { PieceLetter } from "@moveGeneration/PieceControl/PieceControlInterface";
import { compileVariantRuleData } from "@moveGeneration/VariantRules/VariantRuleSetup";
import { parsePGN4Moves } from "./Moves/ParsePGNMoves";
import { serializePGNMoves } from "./Moves/SerializePGNMoves";
import { createDefaultVariantTags, VariantTags } from "./TagInterface";

export function parsePGN4(pgn4: string) {
	let pgn4Tags: string[],
		pgn4Moves = "";
	const match = pgn4.match(/(?=1\.\s*?[xA-ZΑ-ωa-n0-9-])/);
	if (match?.index) {
		pgn4Moves = pgn4.substring(match.index);
		pgn4Tags = pgn4
			.substring(0, match.index)
			.split("]")
			.map((t) => t.trim());
	} else {
		pgn4Tags = pgn4.split("]").map((t) => t.trim());
	}
	const moves = pgn4Moves.length ? parsePGN4Moves(pgn4Moves) : [];

	const variantTags = createDefaultVariantTags();
	let wasFEN4set = false;
	for (const input of pgn4Tags) {
		let variantTag: keyof VariantTags;
		for (variantTag in variantTags) {
			const tag = variantTags[variantTag];
			if (Object.prototype.hasOwnProperty.call(variantTags, variantTag) && tag.verifyTagInParsing(input)) {
				if (variantTag === "startingPosition") wasFEN4set = true;
				tag.currentValue = tag.parseTag(input);
				break;
			}
		}
	}
	if (!wasFEN4set) variantTags.startingPosition.currentValue.fenData.fenOptions.setTag("noCorners", true);

	const gameData: GameData = {
		site: variantTags.site.currentValue,
		gameNumber: variantTags.gameNumber.currentValue,
		date: variantTags.date.currentValue,
		timeControl: variantTags.timeControl.currentValue,
		players: variantTags.playerData.currentValue,
		termination: variantTags.termination.currentValue,
		result: undefined
	};

	const variantRuleData = compileVariantRuleData(variantTags.variantRules.currentValue);
	const promotionPieces = Array.isArray(variantRuleData.promotionPieces) ? variantRuleData.promotionPieces : [];

	const nonPlayablePieceValues: string[] = Object.values(nonPlayablePieces);
	return {
		gameData,
		gameType: variantTags.variantType.currentValue,
		variantRules: variantTags.variantRules.currentValue,
		variantRuleData,
		board: variantTags.startingPosition.currentValue.board,
		fenData: variantTags.startingPosition.currentValue.fenData,
		pieceSet: new Set<PieceLetter>(
			[...variantTags.startingPosition.currentValue.pieceSet, ...promotionPieces].filter((e) => !nonPlayablePieceValues.includes(e))
		),
		moves
	};
}

export interface SerializedBoardStrings {
	board: string;
	moves: string;
}
const defaultTags = createDefaultVariantTags();
export function serializeBoard(board: Board): SerializedBoardStrings {
	return {
		board: Object.values(defaultTags)
			.map((t) => t.serialize(board))
			.filter<string>((v): v is string => v !== undefined)
			.join("\n"),
		moves: serializePGNMoves(board.moves)
	};
}
