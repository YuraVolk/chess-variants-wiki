import React from "react";
import styles from "../EditorSidebar.module.scss";
import { SideToMove } from "./SideToMove";
import { BooleanTupleTags } from "./BooleanTupleTags";
import { CoordinateTags } from "./CoordinateTags";
import { InputTags } from "./InputTags";

export const FENTags = () => {
    return <div className={styles["fen-tags"]}>
        <SideToMove />
        <BooleanTupleTags />
        <CoordinateTags />
        <InputTags />
    </div>
};
