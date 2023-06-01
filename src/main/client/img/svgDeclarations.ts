export const svgBasicShapesArray = ["circle", "ellipse", "line", "path", "polygon", "polyline", "rect"] as const;
export type BasicSVGShape = (typeof svgBasicShapesArray)[number];
export const svgBasicShapeSelector = svgBasicShapesArray.join(",");
export type BasicSVGShapeElement =
	| SVGPathElement
	| SVGCircleElement
	| SVGRectElement
	| SVGEllipseElement
	| SVGLineElement
	| SVGPolygonElement
	| SVGPolylineElement;
