import React from "react";
import styles from "./BoardPlaceholder.module.scss";
import { CSSTransition } from "react-transition-group";

export interface GamePlaceholderProps {
	enabled: boolean;
}

interface GamePlaceholderWrapperProps extends GamePlaceholderProps {
	children: JSX.Element;
}

export const PlaceholderWrapper = ({ enabled, children }: GamePlaceholderWrapperProps) => {
	return (
		<div className={styles["placeholder-wrap"]}>
			<CSSTransition
				in={enabled}
				timeout={{ enter: 0, exit: 300 }}
				unmountOnExit
				classNames={{
					enterActive: styles["placeholder--enter-active"],
					enterDone: styles["placeholder--enter-done"],
					exitActive: styles["placeholder--exit-active"],
					exitDone: styles["placeholder--exit-done"]
				}}>
				{children}
			</CSSTransition>
		</div>
	);
};
