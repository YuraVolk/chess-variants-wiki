import { selectSquareVisibility } from "@client/ts/logic/index/GameBoardSlice";
import type { RootState } from "@client/ts/redux/store";
import { compareCoordinates, DisplaySettings } from "@moveGeneration/Board/BoardInterface";
import type { Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { GameDisplayContext } from "../BoardContext";
import styles from "./GameDisplay.module.scss";
import fleurDeLis from "@client/img/game/fleurDeLis.svg";
import { PieceString, PieceStringObject } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { Atomic } from "@moveGeneration/VariantRules/VariantRuleDefinitions/FENDataDecorators/Atomic";
import { pieceControlConfigSettings } from "@moveGeneration/PieceControl/PieceControlInterface";
import type { StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";
import type { VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { selectBoardSquares, selectFENSettings, selectVariantData } from "@client/ts/redux/GeneralBoardSelectors";
import type { PublicFENSettings } from "@client/ts/logic/index/GameBoardWorker";
import type { BoardSquares } from "@client/ts/logic/BaseInterfaces";

interface GameDisplayWrapProps {
	children: JSX.Element;
	coordinate?: Coordinate;
	atomicHoveredSquare?: Coordinate;
	onClickHandler?: () => void;
	onMouseEnterHandler?: (coordinate: Coordinate) => void;
	onMouseLeaveHandler?: () => void;
}
export const GameDisplaySquareWrap = (props: GameDisplayWrapProps) => {
	const { id, stateController } = useContext(GameDisplayContext);
	const { children, coordinate, onClickHandler, onMouseEnterHandler, onMouseLeaveHandler, atomicHoveredSquare } = props;
	const variantDataRules = useSelector<RootState, StripPieceStringObjects<VariantDataRules>>((state) =>
		selectVariantData({ stateController, id, state })
	);
	const {
		fenOptions: { royal, lives },
		isCustomRoyals
	} = useSelector<RootState, PublicFENSettings>((state) => selectFENSettings({ stateController, id, state }));
	const squareVisibility = useSelector<RootState, BoardSquares<DisplaySettings[]>>((state) => selectSquareVisibility(state, id));
	const boardSquares = useSelector<RootState, BoardSquares<PieceStringObject>>((state) => selectBoardSquares({ stateController, id, state }));

	const surroundings: JSX.Element[] = [];
	const hillStyles: React.CSSProperties = {
		boxShadow: "",
		borderRightStyle: undefined,
		borderLeftStyle: undefined,
		borderTopStyle: undefined,
		borderBottomStyle: undefined
	};

	const hillSquares = variantDataRules.kingOfTheHill;
	if (coordinate) {
		if (hillSquares !== false && hillSquares.some((c) => compareCoordinates(coordinate, c))) {
			if (!hillSquares.some((c) => compareCoordinates([coordinate[0] - 1, coordinate[1]], c))) {
				hillStyles.borderTopStyle = "ridge";
				hillStyles.boxShadow += "rgb(0 0 0 / 40%) 0px 6px 4px -4px inset,";
			}
			if (!hillSquares.some((c) => compareCoordinates([coordinate[0] + 1, coordinate[1]], c))) {
				hillStyles.borderBottomStyle = "groove";
				hillStyles.boxShadow += "rgb(0 0 0 / 40%) 0px -6px 4px -4px inset,";
			}
			if (!hillSquares.some((c) => compareCoordinates([coordinate[0], coordinate[1] + 1], c))) {
				hillStyles.borderRightStyle = "groove";
				hillStyles.boxShadow += "rgb(0 0 0 / 40%) -6px 0px 4px -4px inset,";
			}
			if (!hillSquares.some((c) => compareCoordinates([coordinate[0], coordinate[1] - 1], c))) {
				hillStyles.borderLeftStyle = "ridge";
				hillStyles.boxShadow += "rgb(0 0 0 / 40%) 6px 0px 4px -4px inset,";
			}
		}
		if (hillStyles.boxShadow?.endsWith(",")) hillStyles.boxShadow = hillStyles.boxShadow.slice(0, -1);

		const royalIndex = royal.findIndex((c) => c && compareCoordinates(c, coordinate));
		if (royalIndex !== -1 && !squareVisibility[coordinate[0]][coordinate[1]].includes(DisplaySettings.Fogged)) {
			if (isCustomRoyals) {
				surroundings.push(<img src={fleurDeLis} alt="Fleur de Lis icon" className={styles["square-wrap-surroundings__fleur-de-lis"]} />);
			}

			const live = lives[royalIndex];
			if (variantDataRules.nCheck && live !== null) {
				surroundings.push(<span className={styles["square-wrap-surroundings__lives-indicator"]}>{live === Infinity ? "∞" : live}</span>);
			}
		}

		if (atomicHoveredSquare) {
			if (compareCoordinates(atomicHoveredSquare, coordinate)) {
				surroundings.push(<div className={styles["square-wrap-surroundings__atomic-explosion"]}></div>);
			} else {
				for (const atomicDisplacement of Atomic.atomicCoordinates) {
					const atomicCoordinate: Coordinate = [
						atomicHoveredSquare[0] + atomicDisplacement[0],
						atomicHoveredSquare[1] + atomicDisplacement[1]
					];
					if (!compareCoordinates(coordinate, atomicCoordinate)) continue;
					const pieceString = PieceString.fromObjectToClass(boardSquares[atomicCoordinate[0]][atomicCoordinate[1]]);
					if (pieceString.isWall() || pieceString.isEmpty()) continue;
					if (
						pieceControlConfigSettings[boardSquares[atomicCoordinate[0]][atomicCoordinate[1]]._piece].moveGenerationSettings
							.isPawn &&
						!pieceString.isDead()
					) {
						surroundings.push(<div className={styles["square-wrap-surroundings__atomic-immunity"]}></div>);
					} else {
						surroundings.push(<div className={styles["square-wrap-surroundings__atomic-explosion"]}></div>);
					}
					break;
				}
			}
		}
	}

	return (
		<div
			className={`${styles["square-wrap"]} ${hillSquares ? styles["square-wrap--king-of-the-hill"] : ""}`}
			style={hillStyles}
			onClick={onClickHandler}
			onMouseEnter={() => onMouseEnterHandler?.(coordinate ?? [0, 0])}
			onMouseLeave={onMouseLeaveHandler}>
			{children}
			{surroundings.length !== 0 && <div className={styles["square-wrap-surroundings"]}>{surroundings}</div>}
		</div>
	);
};
