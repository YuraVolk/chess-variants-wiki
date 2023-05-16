import React, { useContext, useReducer } from "react";
import styles from "./EditorSidebar.module.scss";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { UserContext } from "@client/ts/services/PersistedStorage/PieceThemeContext";
import { colors, playerNames } from "@moveGeneration/GameInformation/GameData";
import { createPieceFromData, createPieceFromString, deadColorIndex } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { NumericColor, verifyNumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { wrapIndexedColor } from "@client/ts/interfaces/Colors";
import { Add, throwOnNever } from "@client/ts/baseTypes";
import { PieceImage } from "@components/BoardComponents/GameDisplay/GameDisplayPiece";
import { SVGPieceDisplayGroup } from "@client/img/imageIndex";
import {
	PieceLetter,
	dameLetter,
	defaultPieces,
	nonPlayableValues,
	pawnPieceLetter,
	pieceControlConfigSettings,
	verifyPieceLetter
} from "@moveGeneration/PieceControl/PieceControlInterface";
import { GameDisplaySquare } from "@components/BoardComponents/GameDisplay/GameDisplaySquare";

type PieceGroupIndex = NumericColor | typeof deadColorIndex | Add<typeof deadColorIndex, 1>;
const standardPieces: readonly PieceLetter[] = [
	defaultPieces.king,
	defaultPieces.queen,
	dameLetter,
	defaultPieces.rook,
	defaultPieces.bishop,
	defaultPieces.knight,
	pawnPieceLetter
];

interface SparePieceReducer {
	isExpanded: boolean;
	isFairyPiece: boolean;
	groupIndex: PieceGroupIndex;
}
function sparePieceReducer(
	state: SparePieceReducer,
	action: { type: "expand" } | { type: "toggleFairies" } | { type: "changeIndex"; payload: PieceGroupIndex }
) {
	switch (action.type) {
		case "changeIndex":
			return { ...state, groupIndex: action.payload };
		case "expand":
			return { ...state, isExpanded: !state.isExpanded };
		case "toggleFairies":
			return { ...state, isFairyPiece: !state.isFairyPiece };
		default:
			return throwOnNever(action);
	}
}

const nonPlayableLetterValues = nonPlayableValues.filter<PieceLetter>((p): p is PieceLetter => verifyPieceLetter(p));
function createPieceTypes(state: SparePieceReducer) {
	const basePieceTypes: PieceLetter[] = [];

	if (state.groupIndex !== deadColorIndex && !verifyNumericColor(state.groupIndex) && !state.isExpanded) {
		basePieceTypes.push(...nonPlayableLetterValues);
	} else if (state.isFairyPiece) {
		for (const piece of Object.keys(pieceControlConfigSettings)) {
			if (!verifyPieceLetter(piece) || nonPlayableValues.includes(piece) || standardPieces.includes(piece)) continue;
			basePieceTypes.push(piece);
		}
	} else {
		basePieceTypes.push(...standardPieces);
	}

	const alteredColor = state.groupIndex !== deadColorIndex && !verifyNumericColor(state.groupIndex) ? deadColorIndex : state.groupIndex;
	if (state.isExpanded) {
		return [
			...([...colors, deadColorIndex] as const).flatMap((n) => basePieceTypes.map((p) => createPieceFromData(n, p))),
			...nonPlayableLetterValues.map(p => createPieceFromData(deadColorIndex, p))
		];
	} else {
		return basePieceTypes.map((p) => createPieceFromData(alteredColor, p));
	}
}

export const SparePieces = () => {
	const { id } = useContext(GameDisplayContext),
		themeContext = useContext(UserContext);
	const [state, localDispatch] = useReducer(sparePieceReducer, { isExpanded: false, isFairyPiece: false, groupIndex: 0 });

	return (
		<div className={styles["spare-pieces-wrap"]}>
			<i className={styles["spare-pieces-selectors__hint-text"]}>Click or drag to drop pieces on the board</i>
			<div className={`${styles["spare-pieces"]} ${state.isFairyPiece ? styles["spare-pieces--expanded"] : ""}`}>{
                createPieceTypes(state).map(p => <GameDisplaySquare pieceString={p.toObject()} displaySettings={[]} />)
            }</div>
			<div className={styles["spare-pieces-selectors"]}>
				<div onClick={() => localDispatch({ type: "expand" })}>
					<span className={styles["spare-pieces-selectors__expand-icon"]}></span>
				</div>
				{!state.isExpanded && (
					<div className={styles["spare-pieces-selectors__colors"]}>
						{playerNames.map((name, i) => {
							if (i === deadColorIndex) {
								return (
									<button
										onClick={() => localDispatch({ type: "changeIndex", payload: i })}
										className={styles["spare-pieces-selectors__color"]}
										style={{ color: wrapIndexedColor(themeContext.colors.pieceColors[i]) }}>
										Dead
									</button>
								);
							} else if (verifyNumericColor(i)) {
								return (
									<button
										onClick={() => localDispatch({ type: "changeIndex", payload: i })}
										className={styles["spare-pieces-selectors__color"]}
										style={{ color: wrapIndexedColor(themeContext.colors.pieceColors[i]) }}>
										{name}
									</button>
								);
							} else {
								return (
									<button
										onClick={() => localDispatch({ type: "changeIndex", payload: i })}
										className={styles["spare-pieces-selectors__color"]}>
										Wall
									</button>
								);
							}
						})}
					</div>
				)}
				<button
					className={styles["spare-pieces-selectors__fairy-pieces-button"]}
					onClick={() => localDispatch({ type: "toggleFairies" })}>
					<PieceImage
						pieceString={createPieceFromString("dM")}
						configuration={{
							size: "35px",
							className: styles["spare-pieces-selectors__fairy-pieces-image"],
							customColor: themeContext.colors.pieceColors[deadColorIndex],
							pieceTheme: SVGPieceDisplayGroup.Standard
						}}
					/>
				</button>
			</div>
		</div>
	);
};
