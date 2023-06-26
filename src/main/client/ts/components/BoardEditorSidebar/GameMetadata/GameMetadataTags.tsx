import React from "react";
import styles from "../EditorSidebar.module.scss";
import { NumericFields } from "./NumericFieldsEditor";
import { PlayerFieldsEditor } from "./PlayerFieldsEditor";

export const GameMetadataTags = () => {
    return <div className={styles["fen-tags"]}>
        <NumericFields />
        <PlayerFieldsEditor />
    </div>
};
