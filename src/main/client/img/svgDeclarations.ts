import { validateComprehensiveUnionArray } from "@moveGeneration/GameInformation/GameData";

export type BasicSVGShape = "path" | "circle" | "rect" | "ellipse" | "line" | "polygon" | "polyline";
export const svgBasicShapesArray = validateComprehensiveUnionArray<BasicSVGShape>()([
	"circle",
	"ellipse",
	"line",
	"path",
	"polygon",
	"polyline",
	"rect"
] as const);
export const svgBasicShapeSelector = svgBasicShapesArray.join(",");
export type BasicSVGShapeElement =
	| SVGPathElement
	| SVGCircleElement
	| SVGRectElement
	| SVGEllipseElement
	| SVGLineElement
	| SVGPolygonElement
	| SVGPolylineElement;
