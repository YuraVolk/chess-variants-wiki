import React from "react";
import styles from "./EditorSidebar.module.scss";
import { DimensionSelect } from "./DimensionSelect";
import { BoardSettingsButtons } from "./BoardSettingsButtons";
import { EditVariantRules } from "./EditVariantRules";
import { SparePieces } from "./SparePieces";
import { FENTags } from "./FENTags/FENTags";
import { FENDisplay } from "./FENDisplay";
import { GameMetadataTags } from "./GameMetadata/GameMetadataTags";

interface EditorSidebarProps {
	onApplyChanges: () => void;
	onDiscardChanges: () => void;
}

export const EditorSidebar = (props: EditorSidebarProps) => {
	return (
		<section className={styles.wrap}>
			<div className={styles["board-settings"]}>
				<button
					className={`${styles["board-settings-button"]} ${styles["board-settings-button--active"]}`}
					onClick={() => props.onApplyChanges()}>
					Apply Changes
				</button>
				<button
					className={`${styles["board-settings-button"]} ${styles["board-settings-button--active"]}`}
					onClick={() => props.onDiscardChanges()}>
					Discard Changes
				</button>
			</div>
			<div className={styles["board-settings"]}>
				<DimensionSelect />
				<BoardSettingsButtons />
			</div>
			<EditVariantRules />
			<SparePieces />
			<FENTags />
			<GameMetadataTags />
			<FENDisplay />
		</section>
	);
};
