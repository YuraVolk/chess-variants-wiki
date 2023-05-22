import React, { useCallback, useContext, useMemo } from "react";
import styles from "../EditorSidebar.module.scss";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { createSelector } from "@reduxjs/toolkit";
import {
	changeParametrizedFENTag,
	selectEditorBoardSquares,
	selectEditorFENSettings,
	selectEditorVariantDataRules
} from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";
import { pieceControlConfigSettings } from "@moveGeneration/PieceControl/PieceControlInterface";
import { PieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { boardDimension, colors, convertCoordinateToPGN4, totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { checkBoardOverflow } from "@moveGeneration/PieceControl/PieceControl";
import { EnPassant } from "@moveGeneration/VariantRules/VariantRuleDefinitions/FENDataDecorators/EnPassant";
import type { Coordinate, NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { Tuple, assertNonUndefined, createTupleFromCallback, throwOnNever } from "@client/ts/baseTypes";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import type { PublicFENSettings } from "@client/ts/logic/index/GameBoardWorker";
import { parseEnPassantCoordinates } from "@client/ts/logic/utils/Tags/Utils";
import {
	ZombieType,
	botAlgorithms,
	verifyZombieType
} from "@moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface";

const compareDistanceToPBR = (distance: number, pawnBaseRank: number, isBackwards = false) =>
	distance === pawnBaseRank || (isBackwards ? distance - 1 : distance + 1) === pawnBaseRank;
const selectAllowedEnPassantSquares = () =>
	createSelector(
		[selectEditorVariantDataRules, selectEditorFENSettings, selectEditorBoardSquares],
		({ deadKingWalking, torpedo }, { fenOptions: { dead, resigned, pawnBaseRank } }, boardSquares) => {
			const result = createTupleFromCallback<Array<[Coordinate, Coordinate]>, typeof totalPlayers>(() => [], totalPlayers);
			for (let i = 0; i < boardDimension; i++) {
				for (let j = 0; j < boardDimension; j++) {
					const pieceString = PieceString.fromObjectToClass(boardSquares[i][j]);
					if (!pieceString.isPiece() || !pieceControlConfigSettings[pieceString.piece].moveGenerationSettings.isPawn) continue;
					if (dead[pieceString.color] || (!deadKingWalking && resigned[pieceString.color])) continue;

					let backSquares: Coordinate;
					switch (pieceString.color) {
						case 0:
							backSquares = [i + EnPassant.JUMP_DISTANCE, j];
							break;
						case 1:
							backSquares = [i, j - EnPassant.JUMP_DISTANCE];
							break;
						case 2:
							backSquares = [i - EnPassant.JUMP_DISTANCE, j];
							break;
						case 3:
							backSquares = [i, j + EnPassant.JUMP_DISTANCE];
							break;
						default:
							backSquares = throwOnNever(pieceString.color);
					}

					if (checkBoardOverflow(backSquares[0], backSquares[1]) || boardSquares[backSquares[0]][backSquares[1]].value.length === 1) {
						continue;
					} else if (!torpedo) {
						switch (pieceString.color) {
							case 0:
								if (compareDistanceToPBR(boardDimension - backSquares[0], pawnBaseRank)) {
									break;
								} else continue;
							case 1:
								if (compareDistanceToPBR(j, pawnBaseRank, true)) {
									break;
								} else continue;
							case 2:
								if (compareDistanceToPBR(i, pawnBaseRank, true)) {
									break;
								} else continue;
							case 3:
								if (compareDistanceToPBR(boardDimension - backSquares[1], pawnBaseRank)) {
									break;
								} else continue;
							default:
								throwOnNever(pieceString.color);
						}
					}

					result[pieceString.color].push([[i, j], backSquares]);
				}
			}

			return result;
		}
	);

export const ComplexTags = () => {
	const { id } = useContext(GameDisplayContext);
	const dispatch = useDispatch<AppDispatch>();
	const enPassantSelector = useMemo(() => selectAllowedEnPassantSquares(), []);
	const enPassantSquares = useSelector<RootState, Tuple<Array<[Coordinate, Coordinate]>, typeof totalPlayers>>((state) =>
		enPassantSelector(state, id)
	);
	const publicFENSettings = useSelector<RootState, PublicFENSettings>((state) => selectEditorFENSettings(state, id));

	const onEnPassantChange = useCallback(
		(e: string, index: NumericColor) => {
			if (e) {
				const coordinate = parseEnPassantCoordinates(e);
				if (!coordinate) return;
				dispatch(changeParametrizedFENTag({ id, option: "enPassant", index, newValue: coordinate }));
			} else dispatch(changeParametrizedFENTag({ id, option: "enPassant", index, newValue: null }));
		},
		[dispatch, id]
	);

	const onZombieTypeChange = useCallback(
		(newValue: string, index: NumericColor) => {
			if (!verifyZombieType(newValue)) return;
			dispatch(changeParametrizedFENTag({ id, option: "zombieType", index, newValue }));
		},
		[dispatch, id]
	);

	const dimension = useMemo(() => Math.max(...publicFENSettings.fenOptions.dim), [publicFENSettings.fenOptions.dim]);
	return (
		<>
			<fieldset className={styles["fen-tags__fieldset"]}>
				<legend className={styles["fen-tags__text"]}>EN PASSANT</legend>
				{colors.map((index) => {
					const enPassant = publicFENSettings.fenOptions.enPassant[index];
					if (!enPassantSquares[index].length) return <div key={index} className={styles["en-passant-placeholder"]}></div>;
					return (
						<select
							className={styles["fen-tags__select"]}
							key={index}
							onChange={(e) => onEnPassantChange(e.target.value, index)}
							value={enPassant ? `${convertCoordinateToPGN4(enPassant[0])}:${convertCoordinateToPGN4(enPassant[1])}` : ""}>
							<option value="">None</option>
							{enPassantSquares[index].map((v) => {
								const stringifiedName = `${convertCoordinateToPGN4(v[0], dimension)}:${convertCoordinateToPGN4(
									v[1],
									dimension
								)}`;
								return (
									<option key={stringifiedName} value={`${convertCoordinateToPGN4(v[0])}:${convertCoordinateToPGN4(v[1])}`}>
										{stringifiedName}
									</option>
								);
							})}
						</select>
					);
				})}
			</fieldset>
			<fieldset className={styles["fen-tags__fieldset"]}>
				<legend className={styles["fen-tags__text"]}>Zombie type</legend>
				{colors.map((index) => {
					return (
						<select
							className={styles["fen-tags__select"]}
							key={index}
							value={publicFENSettings.fenOptions.zombieType[index]}
							onChange={(e) => onZombieTypeChange(e.target.value, index)}>
							{Object.values(ZombieType).map((zombieType) => {
								const algorithm = botAlgorithms.get(zombieType);
								assertNonUndefined(algorithm);
								return (
									<option key={zombieType} value={zombieType}>
										{algorithm.getName()}
									</option>
								);
							})}
						</select>
					);
				})}
			</fieldset>
		</>
	);
};
