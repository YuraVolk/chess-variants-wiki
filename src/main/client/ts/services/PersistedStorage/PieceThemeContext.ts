import {
	SVGPieceDisplayGroup,
	RasterPieceDisplayGroup,
	verifySVGPieceDisplayGroup,
	verifyRasterPieceDisplayGroup
} from "@client/img/imageIndex";
import { Tuple, Add } from "@client/ts/baseTypes";
import { IndexedColor, createHexColor, validateIndexedColor } from "@client/ts/interfaces/Colors";
import { totalPlayers } from "@moveGeneration/GameInformation/GameData";
import { ZombieType } from "@moveGeneration/VariantRules/VariantRuleDefinitions/BoardVariantModules/EngineMoveGeneration/BotInterface";
import React from "react";

export interface PieceThemeContextInterface {
	colors: {
		pieceColors: Tuple<IndexedColor, Add<typeof totalPlayers, 1>>;
		whiteBlackColors: [IndexedColor, IndexedColor];
		drawColor: [IndexedColor];
		abortsColor: [IndexedColor];
		zombieColors: Record<ZombieType, IndexedColor>;
	};
	pieceTheme: SVGPieceDisplayGroup | RasterPieceDisplayGroup;
	timeControlColors: {
		hyperbullet: IndexedColor;
		bullet: IndexedColor;
		blitz: IndexedColor;
		rapid: IndexedColor;
	};
}

export function initBaseUserContext(): PieceThemeContextInterface {
	return {
		colors: {
			pieceColors: [
				createHexColor("#bf3b43"),
				createHexColor("#4185bf"),
				createHexColor("#c09526"),
				createHexColor("#4e9161"),
				createHexColor("#8c8a88")
			],
			whiteBlackColors: [createHexColor("#B8B8B8"), createHexColor("#333")],
			drawColor: [createHexColor("#8c8a88")],
			abortsColor: [createHexColor("#e0650d")],
			zombieColors: {
				rando: createHexColor("#fff"),
				ranter: createHexColor("#916e66"),
				comfuter: createHexColor("#874739"),
				pusher: createHexColor("#575880"),
				checker: createHexColor("#916841"),
				muncher: createHexColor("#d4c677"),
				patzer: createHexColor("#396b53"),
				pusher_comfuter: createHexColor("#444860"),
				checker_comfuter: createHexColor("#615838"),
				muncher_comfuter: createHexColor("#b4c657")
			}
		},
		pieceTheme: SVGPieceDisplayGroup.Neo,
		timeControlColors: {
			hyperbullet: createHexColor("#c3c7a3"),
			bullet: createHexColor("#a68b46"),
			blitz: createHexColor("#ffc800"),
			rapid: createHexColor("#769656")
		}
	};
}

export function validateUserContext(context: unknown): PieceThemeContextInterface {
	const verifyValidProperty = <T extends object>(object: T, property: PropertyKey): property is keyof T => property in object;
	const verifyRecordProperty = <K extends PropertyKey>(object: unknown, property: K): object is Record<K, unknown> =>
		typeof object === "object" && object !== null && property in object;
	const verifyZombieTypeProperty = (key: unknown): key is ZombieType => typeof key === "string" && key in ZombieType;

	const baseUserContext = initBaseUserContext();

	try {
		if (typeof context !== "string") throw new Error("Supplied context is not a string");
		const presumedContext: unknown = JSON.parse(context);
		if (typeof presumedContext !== "object" || presumedContext === null) throw new Error("Supplied context is not a valid JSON");
		if ("colors" in presumedContext && typeof presumedContext.colors === "object" && presumedContext.colors !== null) {
			for (const key in presumedContext.colors) {
				if (
					!Object.prototype.hasOwnProperty.call(presumedContext.colors, key) ||
					!verifyValidProperty(baseUserContext.colors, key) ||
					!verifyRecordProperty(presumedContext.colors, key)
				)
					continue;

				const presumedColors = presumedContext.colors[key];
				if (typeof presumedColors !== "object" || !presumedColors) continue;

				const colors = baseUserContext.colors[key];
				if (Array.isArray(colors) && Array.isArray(presumedColors)) {
					for (let i = 0; i < colors.length; i++) {
						const presumedColor = presumedColors[i];
						if (presumedColor && validateIndexedColor(presumedColor)) {
							colors[i] = presumedColor;
						}
					}
				} else if (!Array.isArray(colors) && typeof presumedColors === "object") {
					for (const property in colors) {
						if (
							!Object.prototype.hasOwnProperty.call(colors, property) ||
							!verifyRecordProperty(presumedColors, property) ||
							!verifyZombieTypeProperty(property)
						)
							continue;
						const presumedColor = presumedColors[property];
						if (presumedColor && validateIndexedColor(presumedColor)) {
							colors[property] = presumedColor;
						}
					}
				}
			}
		}
		if (
			"pieceTheme" in presumedContext &&
			typeof presumedContext.pieceTheme === "string" &&
			(verifySVGPieceDisplayGroup(presumedContext.pieceTheme) || verifyRasterPieceDisplayGroup(presumedContext.pieceTheme))
		) {
			baseUserContext.pieceTheme = presumedContext.pieceTheme;
		}
		if (
			"timeControlColors" in presumedContext &&
			presumedContext.timeControlColors &&
			typeof presumedContext.timeControlColors === "object"
		) {
			for (const key in presumedContext.timeControlColors) {
				if (
					!Object.prototype.hasOwnProperty.call(presumedContext.timeControlColors, key) ||
					!verifyValidProperty(baseUserContext.timeControlColors, key) ||
					!verifyRecordProperty(presumedContext.timeControlColors, key)
				)
					continue;

				const presumedColor = presumedContext.timeControlColors[key];
				if (presumedColor && validateIndexedColor(presumedColor)) {
					baseUserContext.timeControlColors[key] = presumedColor;
				}
			}
		}
	} catch (e) {
		console.trace(e);
	}

	return baseUserContext;
}

export const UserContext = React.createContext<PieceThemeContextInterface>(initBaseUserContext());
