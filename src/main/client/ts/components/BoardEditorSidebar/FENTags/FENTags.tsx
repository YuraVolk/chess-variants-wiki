import React from "react";
import styles from "../EditorSidebar.module.scss";
import { SideToMove } from "./SideToMove";

export const FENTags = () => {
    return <div className={styles["fen-tags"]}>
        <SideToMove />
    </div>
};
