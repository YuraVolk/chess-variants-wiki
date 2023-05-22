import React from "react";
import styles from "./EditorSidebar.module.scss";
import { DimensionSelect } from "./DimensionSelect";
import { BoardSettingsButtons } from "./BoardSettingsButtons";
import { EditVariantRules } from "./EditVariantRules";
import { SparePieces } from "./SparePieces";
import { FENTags } from "./FENTags/FENTags";
import { FENDisplay } from "./FENDisplay";

export const EditorSidebar = () => {
	return (
		<section className={styles.wrap}>
			<div className={styles["board-settings"]}>
				<DimensionSelect />
				<BoardSettingsButtons />
			</div>
			<EditVariantRules />
			<SparePieces />
			<FENTags />
			<FENDisplay />
		</section>
	);
};
