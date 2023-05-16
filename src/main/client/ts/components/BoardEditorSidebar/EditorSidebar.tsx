import React, { useContext } from "react";
import styles from "./EditorSidebar.module.scss";
import { UserContext } from "@client/ts/services/PersistedStorage/PieceThemeContext";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import { DimensionSelect } from "./DimensionSelect";
import { BoardSettingsButtons } from "./BoardSettingsButtons";
import { EditVariantRules } from "./EditVariantRules";
import { SparePieces } from "./SparePieces";

export const EditorSidebar = () => {
	const themeContext = useContext(UserContext);

	return (
		<section className={styles.wrap}>
			<div className={styles["board-settings"]}>
				<DimensionSelect />
				<BoardSettingsButtons />
			</div>
			<EditVariantRules />
			<SparePieces />
		</section>
	);
};
