import React, { useContext } from "react";
import type { MoveData, StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";
import styles from "./GameDisplay.module.scss";
import { PieceImage } from "./GameDisplayPiece";
import { ChainedMoveSettings, selectChainedMoveSettings } from "@client/ts/logic/index/GameBoardSlice";
import type { RootState } from "@client/ts/redux/store";
import { useSelector } from "react-redux";
import { PieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import { GameDisplayContext } from "../BoardContext";

export interface PromotionDialogProps {
	promotionPieceLimit: number;
	pieceSize: number;
	onPieceClickCallback: (moveData: StripPieceStringObjects<MoveData>) => void;
}

export const PromotionDialog = (props: PromotionDialogProps) => {
	const id = useContext(GameDisplayContext).id;
	const chainedMoveSettings = useSelector<RootState, ChainedMoveSettings>((state) => selectChainedMoveSettings(state, id));
	if (!chainedMoveSettings.promotionOptions) return null;
	const promotionOptions = chainedMoveSettings.promotionOptions;

	if (!promotionOptions.promotion) {
		props.onPieceClickCallback(promotionOptions);
		return null;
	}

	const elements = promotionOptions.promotion.slice(0, props.promotionPieceLimit);
	let dimension = 1;
	while (elements.length > dimension * dimension) {
		dimension++;
	}

	const borderPadding = (props.pieceSize * dimension) / 20;
	const totalDimensionSize = props.pieceSize * dimension + borderPadding;
	const calcStyles: React.CSSProperties = {
		width: `${totalDimensionSize}px`,
		height: `${totalDimensionSize}px`
	};

	return (
		<div className={styles["promotion-dialog"]} style={calcStyles}>
			{elements.map((pieceString, i) => {
				return (
					<div
						key={`${pieceString.value}-${i}`}
						className={styles["promotion-dialog__piece-display"]}
						onClick={() => props.onPieceClickCallback({ ...promotionOptions, promotion: [pieceString] })}>
						<PieceImage pieceString={PieceString.fromObjectToClass(pieceString)} />
					</div>
				);
			})}
		</div>
	);
};
