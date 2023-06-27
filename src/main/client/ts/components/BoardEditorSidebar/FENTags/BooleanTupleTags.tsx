import React, { useContext, useId } from "react";
import styles from "../EditorSidebar.module.scss";
import { GameDisplayContext } from "@components/BoardComponents/BoardContext";
import type { FENOptionsSerializedState } from "@moveGeneration/FENData/FENOptions/FENOptionsTagsInterface";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@client/ts/redux/store";
import { selectEditorFENSettings, toggleBooleanTupleValue } from "@client/ts/redux/SidebarEditor/SidebarEditorSlice";
import { READONLY_TAGS, verifyBooleanTupleTag } from "@client/ts/redux/SidebarEditor/SidebarEditorInterface";
import { hashString } from "@utils/StringFormatUtils";
import { colors } from "@moveGeneration/GameInformation/GameData";
import type { PlayerBooleanTuple } from "@moveGeneration/Board/Board";

export const BooleanTupleTags = () => {
	const { id } = useContext(GameDisplayContext);
	const dispatch = useDispatch<AppDispatch>();
	const fenOptions = useSelector<RootState, FENOptionsSerializedState>((state) => selectEditorFENSettings(state, id).fenOptions);
	const hash = hashString(useId());

	const resultingTags: JSX.Element[] = [];
	let key: keyof FENOptionsSerializedState;
	for (key in fenOptions) {
		if (!Object.prototype.hasOwnProperty.call(fenOptions, key) || !verifyBooleanTupleTag(key)) continue;
		const value: PlayerBooleanTuple = fenOptions[key],
			option = key;
		resultingTags.push(
			<fieldset key={key} className={styles["fen-tags__fieldset"]}>
				<legend className={styles["fen-tags__text"]}>{READONLY_TAGS[key].getName()}</legend>
				{colors.map((index) => {
					const identifier = `fenTag-${key}-${index}-${hash}`;
					return (
						<div className={styles["fen-tags__checkbox-wrap"]} key={index}>
							<div className={styles["fen-tags__checkbox"]}>
								<input
									id={identifier}
									type="checkbox"
									name={identifier}
									checked={value[index]}
									readOnly
									onClick={() => dispatch(toggleBooleanTupleValue({ id, option, index }))}
									className={styles["fen-tags__fake-checkbox"]}
								/>
								<label htmlFor={identifier} className={styles["fen-tags__label"]}>
									<div className={styles["fen-tags__label-checkbox"]}></div>
								</label>
							</div>
						</div>
					);
				})}
			</fieldset>
		);
	}

	return <>{resultingTags}</>;
};
