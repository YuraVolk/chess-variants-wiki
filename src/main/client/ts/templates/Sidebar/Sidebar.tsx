import React from "react";
import styles from "./Sidebar.module.scss";
import { addTemplate } from "../TemplateInterface";

const Sidebar = (props: { children: JSX.Element | JSX.Element[] }) => {
	return <aside className={styles.sidebar}>{props.children}</aside>;
};

export default addTemplate("sidebar", Sidebar);
