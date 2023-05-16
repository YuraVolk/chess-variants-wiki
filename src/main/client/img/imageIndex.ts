import { colorEnum } from "@moveGeneration/GameInformation/GameUnits/GameUnits";

export enum SVGPieceDisplayGroup {
	Alpha = "Alpha",
	Classic = "Classic",
	Standard = "Standard",
	Neo = "Neo"
}
export enum RasterPieceDisplayGroup {
	Metal = "Metal"
}
export const verifySVGPieceDisplayGroup = (group: PropertyKey): group is SVGPieceDisplayGroup => group in SVGPieceDisplayGroup;
export const verifyRasterPieceDisplayGroup = (group: PropertyKey): group is RasterPieceDisplayGroup => group in RasterPieceDisplayGroup;

const svgImageContexts: Record<SVGPieceDisplayGroup, __WebpackModuleApi.RequireContext> = {
	[SVGPieceDisplayGroup.Alpha]: require.context("./pieces/alpha", false, /\.svg$/),
	[SVGPieceDisplayGroup.Classic]: require.context("./pieces/classic", false, /\.svg$/),
	[SVGPieceDisplayGroup.Standard]: require.context("./pieces/standard", false, /\.svg$/),
	[SVGPieceDisplayGroup.Neo]: require.context("./pieces/neo", false, /\.svg$/)
};

export function importSVGGroupImages() {
	const images: Record<SVGPieceDisplayGroup, Record<string, string>> = {
		[SVGPieceDisplayGroup.Alpha]: {},
		[SVGPieceDisplayGroup.Classic]: {},
		[SVGPieceDisplayGroup.Standard]: {},
		[SVGPieceDisplayGroup.Neo]: {}
	};

	let key: SVGPieceDisplayGroup;
	for (key in svgImageContexts) {
		if (Object.prototype.hasOwnProperty.call(svgImageContexts, key)) {
			const resolve = svgImageContexts[key];
			for (const r of resolve.keys()) {
				images[key][r.replace(/\.\/|\.svg/g, "")] = resolve<{ default: string }>(r).default;
			}
		}
	}

	return images;
}

type RasterImageContext<C> = {
	-readonly [K in keyof typeof colorEnum]: C;
} & { d: C; dw: C; white: C; black: C };
const rasterImageContexts: Record<RasterPieceDisplayGroup, RasterImageContext<__WebpackModuleApi.RequireContext>> = {
	[RasterPieceDisplayGroup.Metal]: {
		r: require.context("./pieces/metal/r/", false, /\.png$/),
		b: require.context("./pieces/metal/b/", false, /\.png$/),
		y: require.context("./pieces/metal/y/", false, /\.png$/),
		g: require.context("./pieces/metal/g/", false, /\.png$/),
		d: require.context("./pieces/metal/d/", false, /\.png$/),
		dw: require.context("./pieces/metal/dw/", false, /\.png$/),
		white: require.context("./pieces/metal/white/", false, /\.png$/),
		black: require.context("./pieces/metal/black/", false, /\.png$/)
	}
};

export function importRasterGroupImages() {
	const images: Record<RasterPieceDisplayGroup, Record<string, RasterImageContext<string>>> = {
		[RasterPieceDisplayGroup.Metal]: {}
	};

	let key: RasterPieceDisplayGroup;
	for (key in rasterImageContexts) {
		if (Object.prototype.hasOwnProperty.call(rasterImageContexts, key)) {
			const currentGroup = images[key];
			const resolveWrap = rasterImageContexts[key];

			let color: keyof RasterImageContext<string>;
			for (color in resolveWrap) {
				const resolve = resolveWrap[color];
				for (const r of resolve.keys()) {
					const validatedName = r.replace(/\.\/|\.png/g, "");
					if (!(validatedName in currentGroup)) {
						currentGroup[validatedName] = {
							r: "",
							b: "",
							y: "",
							g: "",
							d: "",
							dw: "",
							white: "",
							black: ""
						};
					}

					currentGroup[validatedName][color] = resolve<{ default: string }>(r).default;
				}
			}
		}
	}

	return images;
}
