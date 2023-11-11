import type { MoveTreeInterface } from "@moveGeneration/MoveTree/MoveTree";

export function serializePGNMoves(moveTree: MoveTreeInterface): string {
	let resultingString = "";

	for (const moveWrapper of moveTree.parametrizedIterator({
		onAlternativeLineStart() {
			resultingString += "(.. ";
		},
		onAlternativeLineEnd() {
			resultingString = resultingString.replace(/\s\.\.\s$/, "");
			resultingString += " ) ";
		}
	})) {
		if (moveWrapper.metadata.currentFullMove) {
			resultingString = resultingString.replace(/\s\.\.\s$/, "");
			resultingString += ` ${moveWrapper.metadata.currentFullMove}. `;
		}

		resultingString += moveWrapper.cachedNames.fullMoveNotation;
		if (moveWrapper.comment) resultingString += ` {${moveWrapper.comment}}`;
		resultingString += " .. ";
	}
	resultingString = resultingString.replace(/\s\.\.\s$/, "");

	return resultingString;
}
