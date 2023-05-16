import { RGBColor } from "./Colors";

export const DEFAULT_DARK_THRESHOLD = 30;
export function checkIfRGBisTooDark(rgb: RGBColor, threshold: number) {
	const [red, blue, green] = rgb;
	return 0.2126 * red + 0.7152 * green + 0.0722 * blue > threshold;
}
