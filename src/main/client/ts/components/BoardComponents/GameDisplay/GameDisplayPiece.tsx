import React, { useContext } from "react";
import { ReactSVG } from "react-svg";
import { deadColorIndex, PieceString } from "@moveGeneration/GameInformation/GameUnits/PieceString";
import styles from "./GameDisplay.module.scss";
import { stringColorEnum, ColorEnum, colorEnum } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import {
	importRasterGroupImages,
	importSVGGroupImages,
	RasterPieceDisplayGroup,
	SVGPieceDisplayGroup,
	verifyRasterPieceDisplayGroup
} from "src/main/client/img/imageIndex";
import { pawnPieceLetter, pieceControlConfigSettings, PieceLetter } from "@moveGeneration/PieceControl/PieceControlInterface";
import { createHexColor, createRGBColor, IndexedColor, RGBColor, wrapIndexedColor } from "../../../interfaces/Colors";
import { BasicSVGShapeElement, svgBasicShapeSelector } from "@client/img/svgDeclarations";
import { checkIfRGBisTooDark, DEFAULT_DARK_THRESHOLD } from "@client/ts/interfaces/ColorUtils";
import { PieceThemeContextInterface, UserContext } from "@client/ts/services/PersistedStorage/PieceThemeContext";
import type { RootState } from "@client/ts/redux/store";
import { useSelector } from "react-redux";
import { GameDisplayContext } from "../BoardContext";
import { initPieceControlDeclarations } from "@moveGeneration/PieceControl/PieceControlDeclarations";
import type { StripPieceStringObjects } from "@moveGeneration/MoveTree/MoveTreeInterface";
import type { VariantDataRules } from "@moveGeneration/VariantRules/VariantRuleInterface";
import { assertNonUndefined, getEnumKeys } from "@client/ts/baseTypes";
import { selectFENSettings, selectVariantData } from "@client/ts/redux/GeneralBoardSelectors";

const serializer = new XMLSerializer();
const MakeSVG = (path: string, configuration: PieceImageSettings, toggleInformation?: (base64: string) => void) => {
	return (
		<ReactSVG
			src={path}
			beforeInjection={(svg) => {
				if (configuration.size) {
					svg.style.height = configuration.size;
				} else {
					svg.style.height = "32px";
				}

				if (configuration.beforeInjection) {
					configuration.beforeInjection(svg);
				}
				svg.closest("*")?.setAttribute("style", "opacity: 0;");
			}}
			afterInjection={(svg: SVGSVGElement | undefined) => {
				assertNonUndefined(svg);

				Array.from<BasicSVGShapeElement>(svg.querySelectorAll<BasicSVGShapeElement>(svgBasicShapeSelector)).forEach((p) => {
					const styles = getComputedStyle(p);
					const fill = styles.fill;

					if (fill === "none") {
						p.style.fill = "none";
					} else if (Number(styles.opacity) > 0.3) {
						const rgb = fill.split("(")[1].split(",");
						const rgbColors: RGBColor = [
							createRGBColor(Number(rgb[0])),
							createRGBColor(Number(rgb[1])),
							createRGBColor(Number(rgb[2].slice(0, -1)))
						];

						if (checkIfRGBisTooDark(rgbColors, DEFAULT_DARK_THRESHOLD)) {
							p.style.fill = wrapIndexedColor(configuration.customColor);
						} else {
							p.style.fill = fill;
						}
					}

					p.style.opacity = styles.opacity;
				});

				svg.closest("*")?.removeAttribute("style");
				const svgString = `data:image/svg+xml;base64,${window.btoa(serializer.serializeToString(svg))}`;
				toggleInformation?.(svgString);
				const image = document.createElement("img");
				image.setAttribute("src", svgString);
				image.setAttribute("alt", pieceControlConfigSettings[configuration.pieceLetter].naming.name);
				image.setAttribute("style", `width: ${configuration.size}; height: ${configuration.size}`);
				svg.replaceWith(image);
				if (configuration.afterInjection) {
					configuration.afterInjection(svg);
				}
			}}
			className={`${configuration.className} ${configuration.stonewall ? styles["square__piece--stonewall"] : ""}`}
		/>
	);
};

type ExtendedColors = "dw" | "white" | "black";
type PieceRecord = Record<ColorEnum | ExtendedColors, { base64: string } | string>;
type SVGPieceThemeRecord = Record<SVGPieceDisplayGroup, PieceRecord>;
type RasterPieceThemeRecord = Record<RasterPieceDisplayGroup, PieceRecord>;
type ImageSetting = SVGPieceThemeRecord & RasterPieceThemeRecord;
const extendedEnumKeys = {
	...colorEnum,
	d: deadColorIndex,
	dw: deadColorIndex,
	white: 0,
	black: 1
} as const;

initPieceControlDeclarations();
const images = importSVGGroupImages(),
	rasterImages = importRasterGroupImages();
let namesEnum: Record<PieceLetter, ImageSetting> = {};
export const initImagesList = () => {
	let pieceLetter: PieceLetter;
	for (pieceLetter in pieceControlConfigSettings) {
		if (!Object.prototype.hasOwnProperty.call(pieceControlConfigSettings, pieceLetter)) continue;

		const setting = pieceControlConfigSettings[pieceLetter];
		const svgPieceRecord = getEnumKeys(SVGPieceDisplayGroup).reduce<Partial<SVGPieceThemeRecord>>((p, group) => {
			return {
				...p,
				[group]: Object.keys(extendedEnumKeys).reduce<Partial<PieceRecord>>((p, n) => {
					return { ...p, [n]: images[group][setting.naming.shortName] };
				}, {})
			};
		}, {}) as SVGPieceThemeRecord;
		const rasterPieceRecord = getEnumKeys(RasterPieceDisplayGroup).reduce<Partial<RasterPieceThemeRecord>>((p, group) => {
			return {
				...p,
				[group]: rasterImages[group][setting.naming.shortName]
			};
		}, {}) as RasterPieceThemeRecord;

		namesEnum[pieceLetter] = { ...svgPieceRecord, ...rasterPieceRecord };
	}
};
export const resetNamesEnum = () => {
	namesEnum = {};
};

interface PieceImageSettings {
	size: string;
	className: string;
	customColor: IndexedColor;
	cache: boolean;
	beforeInjection?: (svg: SVGSVGElement) => void;
	afterInjection?: (svg: SVGSVGElement) => void;
	stonewall?: boolean;
	pieceTheme?: SVGPieceDisplayGroup | RasterPieceDisplayGroup;
	pieceLetter: PieceLetter;
}
const createDefaultPieceImageConfiguration = (): PieceImageSettings => ({
	size: "inherit",
	className: styles.square__piece,
	cache: false,
	customColor: createHexColor("#fff"),
	pieceLetter: pawnPieceLetter
});

const createPieceImage = (
	settings: {
		url: string;
		stringColor: ColorEnum | ExtendedColors;
		whiteBlack: boolean;
		configuration: PieceImageSettings;
		pieceTheme: SVGPieceDisplayGroup | RasterPieceDisplayGroup;
	},
	callback?: (base64: string) => void
) => {
	const pieceTheme = settings.configuration.pieceTheme ?? settings.pieceTheme;
	if (verifyRasterPieceDisplayGroup(pieceTheme)) {
		return (
			<img
				src={settings.url}
				className={settings.configuration.className}
				width={settings.configuration.size}
				height={settings.configuration.size}
				alt={pieceControlConfigSettings[settings.configuration.pieceLetter].naming.name}
			/>
		);
	} else {
		return MakeSVG(settings.url, { ...settings.configuration, stonewall: settings.stringColor === "dw" }, callback);
	}
};

interface PieceImageProps {
	pieceString: PieceString;
	configuration?: Partial<PieceImageSettings>;
	renderWithStonewall?: true;
}

export const obtainColorFromString = (colorString: ColorEnum | ExtendedColors, context: PieceThemeContextInterface): IndexedColor => {
	if (colorString === "white" || colorString === "black") {
		return context.colors.whiteBlackColors[extendedEnumKeys[colorString]];
	} else {
		return context.colors.pieceColors[extendedEnumKeys[colorString]];
	}
};

export const PieceImage = (props: PieceImageProps) => {
	const context = useContext(UserContext);
	const { id, stateController } = useContext(GameDisplayContext);
	const variantDataRules = useSelector<RootState, StripPieceStringObjects<VariantDataRules>>((state) =>
		selectVariantData({ state, id, stateController })
	);

	const whiteBlack = useSelector<RootState, boolean>((state) => selectFENSettings({ state, id, stateController }).fenOptions.wb);
	const configuration = { ...createDefaultPieceImageConfiguration(), ...props.configuration },
		piece = pieceControlConfigSettings[props.pieceString.piece].naming.shortName;
	let color: ColorEnum | ExtendedColors = stringColorEnum[props.pieceString.color];
	if ((variantDataRules.stonewall || props.renderWithStonewall) && color === "d") color = "dw";
	if (whiteBlack && color === "r") color = "white";
	if (whiteBlack && color === "y") color = "black";

	const imageConfiguration = {
		...configuration,
		customColor: props.configuration?.customColor ? configuration.customColor : obtainColorFromString(color, context),
		pieceLetter: props.pieceString.piece
	};

	const pieceTheme = configuration.pieceTheme ?? context.pieceTheme;
	if (configuration.cache) {
		const imagePath = namesEnum[props.pieceString.piece][pieceTheme],
			image = imagePath[color];
		if (typeof image === "string") {
			return createPieceImage(
				{
					url: image,
					configuration: imageConfiguration,
					stringColor: color,
					pieceTheme,
					whiteBlack
				},
				(base64) => {
					imagePath[color] = { base64 };
				}
			);
		} else {
			return (
				<img
					src={image.base64}
					alt={pieceControlConfigSettings[props.pieceString.piece].naming.name}
					width={configuration.size}
					height={configuration.size}
					className={configuration.className}
				/>
			);
		}
	} else {
		const imageUrl = verifyRasterPieceDisplayGroup(pieceTheme) ? rasterImages[pieceTheme][piece][color] : images[pieceTheme][piece];
		return createPieceImage({
			url: imageUrl,
			configuration: imageConfiguration,
			stringColor: color,
			pieceTheme,
			whiteBlack
		});
	}
};
