import type { MoveTreeInterface } from "@moveGeneration/MoveTree/MoveTree";
import type { MoveWrapper } from "@moveGeneration/MoveTree/MoveTreeInterface";

export function serializePGNMoves(moveTree: MoveTreeInterface): string {
	let resultingString = "";
	
	const traverse = (moves: MoveWrapper[]) => {
		for (const moveWrapper of moves) {
			if (moveWrapper.metadata.currentFullMove) {
				resultingString = resultingString.replace(/\s\.\.\s$/, "");
				resultingString += ` ${moveWrapper.metadata.currentFullMove}. `;
			}

			resultingString += moveWrapper.cachedNames.fullMoveNotation;
			if (moveWrapper.comment) resultingString += ` {${moveWrapper.comment}}`;
			resultingString += " .. ";

			for (const alternativeLine of moveWrapper.alternativeLines) {
				resultingString += "(.. ";
				traverse(alternativeLine);
				resultingString += " )";
			}
		}

		resultingString = resultingString.replace(/\s\.\.\s$/, "");
	};

	traverse(moveTree.moves);
	return resultingString;
}
