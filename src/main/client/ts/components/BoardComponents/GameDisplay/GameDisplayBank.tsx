import React from "react";
import { throwOnNever } from "../../../baseTypes";
import type { PieceStringObject } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import styles from "./GameDisplay.module.scss";
import { GameDisplaySquare } from "./GameDisplaySquare";
import { useCallback, useContext } from "react";
import { createDroppingMovesAction } from "@client/ts/redux/WorkerSync/WorkerSaga";
import {
	ChainedMoveSettings,
	getChainedSeirawanMoves,
	selectChainedMoveSettings,
	selectGameBoardVariantData
} from "@client/ts/logic/index/GameBoardSlice";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { NumericColor, verifyNumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import { DisplaySettings } from "@moveGeneration/Board/BoardInterface";
import { GameDisplayContext } from "../BoardContext";
import { VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { selectFENSettings } from "@client/ts/redux/GeneralBoardSelectors";
import { PublicFENSettings } from "@client/ts/logic/index/GameBoardWorker";

export interface PieceBankProps {
	pieces: Array<[PieceStringObject, number]>;
}

interface ComponentDirectionConfiguration {
	color: NumericColor;
	component: JSX.Element;
	styles: {
		base: string;
		top: string;
		left: string;
		bottom: string;
		right: string;
	};
}
export const initializeComponentWithDirections = (configuration: ComponentDirectionConfiguration) => {
	const bankStyles = [configuration.styles.base];
	switch (configuration.color) {
		case 0:
			bankStyles.push(configuration.styles.bottom, configuration.styles.right);
			break;
		case 1:
			bankStyles.push(configuration.styles.bottom, configuration.styles.left);
			break;
		case 2:
			bankStyles.push(configuration.styles.top, configuration.styles.left);
			break;
		case 3:
			bankStyles.push(configuration.styles.top, configuration.styles.right);
			break;
		default:
			throwOnNever(configuration.color);
	}

	return (
		<div className={bankStyles.join(" ")} key={bankStyles.join(",")}>
			{configuration.component}
		</div>
	);
};

export const PieceBank = (props: PieceBankProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { id, worker, stateController } = useContext(GameDisplayContext);
	const chainedMoveSettings = useSelector<RootState, ChainedMoveSettings | undefined>((state) =>
		stateController === "gameBoards" ? selectChainedMoveSettings(state, id) : undefined
	);
	const variantDataRules = useSelector<RootState, StripPieceStringObjects<VariantDataRules> | undefined>((state) =>
		selectGameBoardVariantData(state, id)
	);

	const onBankPieceClick = useCallback(
		(piece: PieceStringObject) => {
			if (!chainedMoveSettings) return;
			if (chainedMoveSettings.seirawanDrops) {
				dispatch(getChainedSeirawanMoves({ id, piece }));
			} else {
				dispatch(createDroppingMovesAction({ id, worker, args: [piece] }));
			}
		},
		[chainedMoveSettings, id, dispatch, worker]
	);

	if (Object.keys(props.pieces).length === 0) return null;
	return (
		<div className={styles["piece-bank"]}>
			{props.pieces.map(([piece, count], i) => {
				return (
					<div
						className={styles["piece-bank__piece-wrap"]}
						key={`${piece.value}-${count}-${i}`}
						onClick={() => onBankPieceClick(piece)}>
						<div className={styles["piece-bank__piece"]}>
							<GameDisplaySquare
								pieceString={piece}
								displaySettings={variantDataRules?.blindfold ? [DisplaySettings.Blindfolded] : []}
							/>
						</div>
						<div className={styles["piece-bank__piece-count"]}>{count}</div>
					</div>
				);
			})}
		</div>
	);
};

export const PieceBankList = () => {
	const { id, stateController } = useContext(GameDisplayContext);
	const {
		fenOptions: { areBanksEnabled, bank }
	} = useSelector<RootState, PublicFENSettings>((state) => selectFENSettings({ stateController, state, id }));

	return (
		<div className={styles["piece-bank-container"]}>
			{areBanksEnabled.map((enabled, color) => {
				if (!enabled || !verifyNumericColor(color)) return null;

				const pieceBank = <PieceBank pieces={bank[color]} />;
				const configuration = {
					color,
					component: pieceBank,
					styles: {
						base: styles["piece-bank-wrap"],
						top: styles["piece-bank-wrap--top"],
						left: styles["piece-bank-wrap--left"],
						bottom: styles["piece-bank-wrap--bottom"],
						right: styles["piece-bank-wrap--right"]
					}
				};
				return initializeComponentWithDirections(configuration);
			})}
		</div>
	);
};
