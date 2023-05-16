import React, { useState, useCallback, useRef } from "react";
import { addTemplate } from "../TemplateInterface";
import styles from "./Accordion.module.scss";

const Accordion = (props: { name: string; children?: JSX.Element | JSX.Element[] }) => {
	const [isActive, setIsActive] = useState(false);
	const [elementHeight, setElementHeight] = useState(0);
	const contentElement = useRef<HTMLDivElement>(null);

	const toggleActive = useCallback(
		(e: React.MouseEvent<HTMLDetailsElement>) => {
			e.preventDefault();
			setIsActive(!isActive);
			setElementHeight(isActive ? 0 : contentElement.current?.scrollHeight ?? 0);
		},
		[isActive]
	);

	return (
		<details className={`${styles.accordion} ${isActive ? styles["accordion--active"] : ""}`} open onClick={(e) => toggleActive(e)}>
			<summary className={styles.accordion__header}>{props.name}</summary>
			<div
				className={styles.accordion__contents}
				ref={contentElement}
				style={{
					maxHeight: `${elementHeight}px`
				}}>
				{props.children}
			</div>
		</details>
	);
};

export default addTemplate("accordion", Accordion);
