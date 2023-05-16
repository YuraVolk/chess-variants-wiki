import React from "react";
import { PieceString, PieceStringObject } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import styles from "./GameDisplay.module.scss";
import wall from "../../../../img/pieces/wallStandard.svg";
import duck from "../../../../img/pieces/duckStandard.svg";
import { DisplaySettings } from "@moveGeneration/Board/BoardInterface";
import { PieceImage } from "./GameDisplayPiece";
import { throwOnNever } from "../../../baseTypes";

export interface GameDisplayProps {
	pieceString: PieceStringObject;
	displaySettings: DisplaySettings[];
}

export const GameDisplaySquare = (props: GameDisplayProps) => {
	const displaySettings = new Set(props.displaySettings),
		pieceString = PieceString.fromObjectToClass(props.pieceString);
	if (pieceString.isWall()) {
		switch (pieceString.piece) {
			case "X":
				return (
					<div className={styles.square}>
						<img src={wall} />
					</div>
				);
			case "x":
				return <div className={`${styles.square} ${styles["square--ghosted"]}`}></div>;
			case "Θ":
				return (
					<div className={styles.square}>
						<img src={duck} />
					</div>
				);
			default:
				throwOnNever(pieceString.piece);
		}
	}

	const isFogged = displaySettings.has(DisplaySettings.Fogged);
	const noPieceDisplay = pieceString.isEmpty() || displaySettings.has(DisplaySettings.Blindfolded) || isFogged;
	const pieceSVG = noPieceDisplay ? <div></div> : <PieceImage pieceString={pieceString} configuration={{ cache: true }} />;
	const isGhosted = displaySettings.has(DisplaySettings.Ghosted);
	const isHighlighted = displaySettings.has(DisplaySettings.Highlighted) && !isGhosted;

	const transformation: React.CSSProperties = {
		boxShadow: ""
	};
	if (displaySettings.has(DisplaySettings.PieceFacesCenter)) {
		let transform = "";
		switch (pieceString.color) {
			case 0:
				break;
			case 1:
				transform = "0.25turn";
				break;
			case 2:
				transform = "0.5turn";
				break;
			case 3:
				transform = "-0.25turn";
				break;
			default:
				break;
		}
		transformation.transform = `rotate(${transform})`;
	}

	return (
		<div
			style={transformation}
			className={`${styles.square} ${isHighlighted ? styles["square--active"] : ""}
         ${isGhosted ? styles["square--ghosted"] : ""}
         ${isFogged ? styles["square--fogged"] : ""}`}>
			{pieceSVG}
		</div>
	);
};
