import React from "react";
import styles from "./BoardPlaceholder.module.scss";
import { GamePlaceholderProps, PlaceholderWrapper } from "./PlaceholderInterface";

export const BoardPlaceholder = ({ enabled }: GamePlaceholderProps) => {
	return (
		<PlaceholderWrapper enabled={enabled}>
			<div className={styles["placeholder__image-loading"]}></div>
		</PlaceholderWrapper>
	);
};
