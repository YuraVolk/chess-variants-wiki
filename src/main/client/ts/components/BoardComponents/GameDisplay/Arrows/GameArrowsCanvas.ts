import { assertNonUndefined } from "@client/ts/baseTypes";
import { createHexColor, IndexedColor, wrapIndexedColor } from "@client/ts/interfaces/Colors";
import { boardDimension } from "@moveGeneration/GameInformation/GameData";
import { NumericColor } from "@moveGeneration/GameInformation/GameUnits/GameUnits";
import type { HighlightArrow, HighlightSquare } from "@moveGeneration/MoveTree/MoveTreeInterface";
import { cornerAreaToPx, dimensionRegressionConstant } from "../GameDisplay";

export interface CanvasCoordinate {
	x: number;
	y: number;
}

const colors: Record<NumericColor, IndexedColor> = {
	[0]: createHexColor("#F8553F"),
	[1]: createHexColor("#48C1F9"),
	[2]: createHexColor("#FFAA00"),
	[3]: createHexColor("#9FCF3F")
};

export class ArrowsCanvas {
	private readonly boardRatio: number;
	private readonly canvasRatio: number;
	private readonly resolution: number;
	private static readonly SCALE = 3;
	private static readonly ARROW_STEM_WIDTH = 4;
	private static readonly PI_RADIUS = 2 * Math.PI;
	private startingPoint: CanvasCoordinate = { x: 0, y: 0 };
	private endPoint: CanvasCoordinate = { x: 0, y: 0 };
	private isMouseDown = false;

	private readonly drawingContext: CanvasRenderingContext2D;
	private readonly context: CanvasRenderingContext2D;
	constructor(private readonly canvas: HTMLCanvasElement, drawingCanvas: HTMLCanvasElement, private readonly dimension: number) {
		const nullableContext = canvas.getContext("2d");
		assertNonUndefined(nullableContext);
		const canvasSize = cornerAreaToPx * dimension;
		canvas.width = canvas.height = drawingCanvas.width = drawingCanvas.height = dimension * cornerAreaToPx * ArrowsCanvas.SCALE;
		this.context = nullableContext;
		this.context.scale(ArrowsCanvas.SCALE, ArrowsCanvas.SCALE);
		const nullableDrawingContext = drawingCanvas.getContext("2d");
		assertNonUndefined(nullableDrawingContext);
		this.drawingContext = nullableDrawingContext;
		this.drawingContext.scale(ArrowsCanvas.SCALE, ArrowsCanvas.SCALE);
		this.resolution = dimensionRegressionConstant / dimension / ArrowsCanvas.SCALE;
		this.canvasRatio = canvasSize / dimension;
		this.boardRatio = dimension / boardDimension;

		this.setColor(this.drawingContext, 2);
		this.setColor(this.context, 2);
	}

	private numberToCoordinate(num: number) {
		return cornerAreaToPx * Math.floor(num / cornerAreaToPx) + cornerAreaToPx / 2;
	}

	private highlightSquare(context: CanvasRenderingContext2D, { x, y }: CanvasCoordinate) {
		context.beginPath();
		context.lineWidth = 3;
		context.arc(x, y, this.resolution - 5, 0, ArrowsCanvas.PI_RADIUS);
		context.stroke();
	}

	private drawArrowHead(
		context: CanvasRenderingContext2D,
		{ x: startX, y: startY }: CanvasCoordinate,
		{ x: endX, y: endY }: CanvasCoordinate
	) {
		let angle: number,
			x = 0,
			y = 0;
		const alterXY = () => {
			x = (this.resolution / 2) * Math.cos(angle) + endX;
			y = (this.resolution / 2) * Math.sin(angle) + endY;
		};

		context.beginPath();
		angle = Math.atan2(endY - startY, endX - startX);
		alterXY();
		context.moveTo(x, y);
		for (let i = 0; i < 2; i++) {
			angle += (1 / 3) * ArrowsCanvas.PI_RADIUS;
			alterXY();
			context.lineTo(x, y);
		}
		context.closePath();
		context.fill();
	}

	private highlightWithArrow(context: CanvasRenderingContext2D, start: CanvasCoordinate, { x: endX, y: endY }: CanvasCoordinate) {
		const { x: startX, y: startY } = start;
		let xFactor: number, yFactor: number;
		if (startX === endX) {
			yFactor = Math.sign(endY - startY) * (cornerAreaToPx >> 2);
			xFactor = 0;
		} else if (startY === endY) {
			xFactor = Math.sign(endX - startX) * (cornerAreaToPx >> 2);
			yFactor = 0;
		} else {
			const slope = Math.abs((endY - startY) / (endX - startX));
			xFactor = (Math.sign(endX - startX) * (cornerAreaToPx >> 2)) / Math.sqrt(slope * slope);
			yFactor = Math.sign(endY - startY) * Math.abs(xFactor) * slope;
		}

		context.beginPath();
		context.lineCap = "round";
		context.lineWidth = ArrowsCanvas.ARROW_STEM_WIDTH;
		context.moveTo(startX, startY);
		const endXFactor = endX - xFactor,
			endYFactor = endY - yFactor;
		context.lineTo(endXFactor, endYFactor);
		context.stroke();
		this.drawArrowHead(context, start, { x: endXFactor, y: endYFactor });
	}

	private getMousePosition(mouseEvent: PointerEvent): CanvasCoordinate {
		const rect = this.canvas.getBoundingClientRect();
		return {
			x: this.numberToCoordinate((mouseEvent.clientX - rect.left) * this.boardRatio),
			y: this.numberToCoordinate((mouseEvent.clientY - rect.top) * this.boardRatio)
		};
	}

	private setColor(context: CanvasRenderingContext2D, color: NumericColor) {
		context.strokeStyle = context.fillStyle = wrapIndexedColor(colors[color]);
	}

	private adaptNumber(num: number) {
		return ((num * this.dimension) / boardDimension) * this.canvasRatio;
	}

	clearCanvas() {
		this.drawingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	private getNumericColorFromKeys(keys: ReadonlySet<string>): NumericColor {
		if (keys.has("Alt")) {
			return 1;
		} else if (keys.has("Control")) {
			return 0;
		} else if (keys.has("Shift")) {
			return 3;
		} else {
			return 2;
		}
	}

	setKeysPressed(keys: ReadonlySet<string>) {
		const color = this.getNumericColorFromKeys(keys);
		this.setColor(this.drawingContext, color);
		this.setColor(this.context, color);
		if (this.isMouseDown) {
			this.drawingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
			if (this.startingPoint.x === this.endPoint.x && this.startingPoint.y === this.endPoint.y) {
				this.highlightSquare(this.drawingContext, this.startingPoint);
			} else {
				this.highlightWithArrow(this.drawingContext, this.startingPoint, this.endPoint);
			}
		}
	}

	drawSquare([color, [x, y]]: HighlightSquare) {
		this.setColor(this.context, color);
		const canvasX = this.numberToCoordinate(this.adaptNumber(x)),
			canvasY = this.numberToCoordinate(this.adaptNumber(y));
		this.highlightSquare(this.context, { x: canvasX, y: canvasY });
	}

	drawArrow([color, [startX, startY], [endX, endY]]: HighlightArrow) {
		this.setColor(this.context, color);
		this.highlightWithArrow(
			this.context,
			{
				x: this.numberToCoordinate(this.adaptNumber(startX)),
				y: this.numberToCoordinate(this.adaptNumber(startY))
			},
			{
				x: this.numberToCoordinate(this.adaptNumber(endX)),
				y: this.numberToCoordinate(this.adaptNumber(endY))
			}
		);
	}

	onPointerDown(event: PointerEvent) {
		if (event.button === 2) {
			this.isMouseDown = true;
			this.startingPoint = this.getMousePosition(event);
			this.endPoint = { ...this.startingPoint };
			this.highlightSquare(this.drawingContext, this.startingPoint);
		}
	}

	onPointerUp(event: PointerEvent) {
		if (event.button === 2) {
			this.isMouseDown = false;
			if (this.startingPoint.x === this.endPoint.x && this.startingPoint.y === this.endPoint.y) {
				this.highlightSquare(this.context, this.startingPoint);
			} else {
				this.highlightWithArrow(this.context, this.startingPoint, this.endPoint);
			}
			this.drawingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
		} else if (event.button === 1) this.clearCanvas();
	}

	onPointerMove(event: PointerEvent) {
		this.endPoint = this.getMousePosition(event);
		if (!this.isMouseDown || (this.startingPoint.x === this.endPoint.x && this.startingPoint.y === this.endPoint.y)) return;
		this.drawingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.highlightWithArrow(this.drawingContext, this.startingPoint, this.endPoint);
	}
}
