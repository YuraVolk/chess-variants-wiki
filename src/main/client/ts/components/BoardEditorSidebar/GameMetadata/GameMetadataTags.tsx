import React from "react";
import styles from "../EditorSidebar.module.scss";
import { NumericFields } from "./NumericFieldsEditor";
import { PlayerFieldsEditor } from "./PlayerFieldsEditor";
import { StringFieldsEditor } from "./StringFieldsEditor";

export const GameMetadataTags = () => {
	return (
		<div className={styles["fen-tags"]}>
			<NumericFields />
			<PlayerFieldsEditor />
			<StringFieldsEditor />
		</div>
	);
};
