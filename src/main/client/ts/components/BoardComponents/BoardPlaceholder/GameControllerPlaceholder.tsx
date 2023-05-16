import React from "react";
import styles from "./BoardPlaceholder.module.scss";
import { GamePlaceholderProps, PlaceholderWrapper } from "./PlaceholderInterface";
import { createTupleFromCallback } from "@client/ts/baseTypes";
import { boardDimension } from "@moveGeneration/GameInformation/GameData";

export const GameControllerPlaceholder = ({ enabled }: GamePlaceholderProps) => {
	return (
		<PlaceholderWrapper enabled={enabled}>
			<div>
				<div className={`${styles["placeholder__image-loading"]} ${styles["placeholder__image-loading--large-sized"]}`}></div>
				<div className={styles.placeholder__background}>
					{createTupleFromCallback(
						(_, i) => (
							<div key={i} className={styles["placeholder__background-text"]}></div>
						),
						boardDimension
					)}
				</div>
			</div>
		</PlaceholderWrapper>
	);
};
