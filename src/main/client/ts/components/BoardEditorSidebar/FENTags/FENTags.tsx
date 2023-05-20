import React from "react";
import styles from "../EditorSidebar.module.scss";
import { SideToMove } from "./SideToMove";
import { BooleanTupleTags } from "./BooleanTupleTags";

export const FENTags = () => {
    return <div className={styles["fen-tags"]}>
        <SideToMove />
        <BooleanTupleTags />
    </div>
};
