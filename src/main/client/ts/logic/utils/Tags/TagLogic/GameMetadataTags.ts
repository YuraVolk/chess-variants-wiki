import { createTupleFromCallback, Tuple } from "@client/ts/baseTypes";
import {
	colors,
	GamePlayerData,
	getPlayerNameFromColor,
	playerNames,
	Termination,
	TimeControl,
	totalPlayers,
	validateTerminationString,
	VariantType
} from "@moveGeneration/GameInformation/GameData";
import { truncateNumber } from "@utils/NumberUtils";
import type { VariantTag } from "../TagInterface";
import { tagNamesEqual, unwrapTag, wrapTag } from "../Utils";

const variantTypeTag = "Variant";
export const createVariantTypeTag = (): VariantTag<VariantType> => ({
	tag: "variantType",
	currentValue: VariantType.FFA,
	verifyTagInParsing(inputTag) {
		return tagNamesEqual(inputTag, variantTypeTag);
	},
	parseTag(inputTag) {
		const tagContents = unwrapTag(inputTag, variantTypeTag);
		for (const type of Object.values(VariantType)) {
			if (tagContents === type) return type;
		}

		return VariantType.FFA;
	},
	serialize(board) {
		return wrapTag(variantTypeTag, board.gameType.type);
	}
});

const variantDateTag = "Date";
export const createDateTag = (): VariantTag<Date> => ({
	tag: "date",
	currentValue: new Date(),
	verifyTagInParsing(inputTag) {
		return tagNamesEqual(inputTag, variantDateTag);
	},
	parseTag(tagContents) {
		return new Date(unwrapTag(tagContents, variantDateTag));
	},
	serialize(board) {
		if (!board.gameData.date) return;
		if (typeof board.gameData.date === "object") {
			return wrapTag(variantDateTag, board.gameData.date.toUTCString());
		} else {
			return wrapTag(variantDateTag, board.gameData.date);
		}
	}
});

const variantSiteTag = "Site";
export const createSiteTag = (): VariantTag<string> => ({
	tag: "site",
	currentValue: "",
	verifyTagInParsing(inputTag) {
		return tagNamesEqual(inputTag, variantSiteTag);
	},
	parseTag(tagContents) {
		return unwrapTag(tagContents, variantSiteTag);
	},
	serialize(board) {
		if (!board.gameData.site) return;
		return wrapTag(variantSiteTag, board.gameData.site);
	}
});

const variantTimeControlTag = "TimeControl",
	getDefaultTimeControl = (): TimeControl => ({ baseTime: 180, increment: 2, isDelay: false });
export const createTimeControlTag = (): VariantTag<TimeControl> => ({
	tag: "timeControl",
	currentValue: getDefaultTimeControl(),
	verifyTagInParsing(inputTag) {
		return tagNamesEqual(inputTag, variantTimeControlTag);
	},
	parseTag(inputTag) {
		const defaultTC = getDefaultTimeControl();
		const matchArray = unwrapTag(inputTag, variantTimeControlTag)
			.match(/^((?:0\.\d\d?)?|(?:\d\d?s?))(?:(?:(?:\+|\|)(\d\d?)(D?))|(\smin))$/)
			?.slice(1);

		if (matchArray) {
			const [minutesMatch, secondsMatch, delay] = matchArray;
			if (!secondsMatch) return defaultTC;
			defaultTC.isDelay = delay ? true : false;
			if (/\smin/.test(secondsMatch)) {
				defaultTC.increment = 0;
			} else {
				defaultTC.increment = Number(secondsMatch);
			}
			if (minutesMatch.endsWith("s")) {
				defaultTC.baseTime = Math.round(Number(minutesMatch.slice(0, -1)));
			} else {
				defaultTC.baseTime = Number(minutesMatch) * 60;
			}
		}

		return defaultTC;
	},
	serialize(board) {
		const timeControl = board.gameData.timeControl;
		const noIncrement = timeControl.increment === 0;
		let timeControlString = "";
		if (timeControl.baseTime < 60) {
			timeControlString += noIncrement ? `${timeControl.baseTime * 60} sec` : `${timeControl.baseTime * 60}s`;
		} else if (timeControl.baseTime > 60 && noIncrement) {
			timeControlString += `${truncateNumber(timeControl.baseTime / 60, 1)} min`;
		} else {
			timeControlString += truncateNumber(timeControl.baseTime / 60, 1);
		}

		if (!noIncrement) {
			timeControlString += "|";
			timeControlString += timeControl.increment;
		}
		if (timeControl.isDelay) {
			timeControlString += "D";
		}

		return wrapTag(variantTimeControlTag, timeControlString);
	}
});

const variantTerminationTag = "Termination";
export const createTerminationTag = (): VariantTag<Termination | undefined> => ({
	tag: "termination",
	currentValue: undefined,
	verifyTagInParsing(inputTag) {
		return tagNamesEqual(inputTag, variantTerminationTag);
	},
	parseTag(inputTag) {
		const tagContents = unwrapTag(inputTag, variantTerminationTag);
		return validateTerminationString(tagContents) ? tagContents : undefined;
	},
	serialize(board) {
		if (!board.gameData.termination) return;
		return wrapTag(variantTerminationTag, board.gameData.termination);
	}
});

const variantGameId = "GameNr";
export const createGameNumberTag = (): VariantTag<number | undefined> => ({
	tag: "gameNumber",
	currentValue: undefined,
	verifyTagInParsing(inputTag) {
		return tagNamesEqual(inputTag, variantGameId);
	},
	parseTag(inputTag) {
		const id = Number(unwrapTag(inputTag, variantGameId));
		return isNaN(id) ? undefined : id;
	},
	serialize(board) {
		if (!board.gameData.gameNumber) return;
		return wrapTag(variantGameId, board.gameData.gameNumber.toString());
	}
});

export const createPlayerDataTag = (): VariantTag<Tuple<GamePlayerData, typeof totalPlayers>> => ({
	tag: "playerData",
	currentValue: createTupleFromCallback(() => ({}), totalPlayers),
	verifyTagInParsing(inputTag) {
		for (const color of colors) {
			const playerName = getPlayerNameFromColor(color);
			if (tagNamesEqual(inputTag, playerName) || tagNamesEqual(inputTag, `${playerName}Elo`)) return true;
		}

		return false;
	},
	parseTag(inputTag) {
		for (const color of colors) {
			const playerName = getPlayerNameFromColor(color);
			const newCurrentValue: Tuple<GamePlayerData, typeof totalPlayers> = [...this.currentValue];
			if (tagNamesEqual(inputTag, playerName)) {
				const name = unwrapTag(inputTag, playerName);
				if (name) newCurrentValue[color] = { ...newCurrentValue[color], name };
				return newCurrentValue;
			} else if (tagNamesEqual(inputTag, `${playerName}Elo`)) {
				const elo = Number(unwrapTag(inputTag, `${playerName}Elo`));
				if (!isNaN(elo)) newCurrentValue[color] = { ...newCurrentValue[color], elo };
				return newCurrentValue;
			}
		}

		throw new Error("Tag does not match any player data signature");
	},
	serialize(board) {
		const uniqueResultingTags: string[] = [];
		for (const color of colors) {
			const playerData = board.gameData.players[color];
			if (playerData.elo) {
				uniqueResultingTags.push(wrapTag(`${playerNames[color]}Elo`, String(playerData.elo)));
			}
			if (playerData.name) {
				uniqueResultingTags.push(wrapTag(`${playerNames[color]}`, String(playerData.name)));
			}
		}

		return uniqueResultingTags.join("\n");
	}
});

const resultsTag = "Results";
export const createResultsTag = (): VariantTag<string> => ({
	tag: "results",
	currentValue: "",
	verifyTagInParsing(inputTag) {
		return tagNamesEqual(inputTag, resultsTag);
	},
	parseTag(tagContents) {
		return unwrapTag(tagContents, resultsTag);
	},
	serialize(board) {
		if (!board.gameData.result) return;
		return wrapTag(resultsTag, board.gameData.result);
	}
});
