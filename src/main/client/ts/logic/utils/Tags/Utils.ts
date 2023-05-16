import type { Coordinate } from "@moveGeneration/GameInformation/GameUnits/GameUnits";

export function parseSingleCoordinate(coordinate: string): Coordinate | undefined {
	if (coordinate.length === 0) return;
	const parsedCoordinate: [number, number] = [14 - Number(coordinate.slice(1)), coordinate.charCodeAt(0) - 97];
	if (Number.isNaN(parsedCoordinate[0]) || Number.isNaN(parsedCoordinate[1])) return;
	if (parsedCoordinate[0] < 0 || parsedCoordinate[0] > 13 || parsedCoordinate[1] < 0 || parsedCoordinate[1] > 13) return;
	return parsedCoordinate;
}

export function parseEnPassantCoordinates(coordinates: string): [Coordinate, Coordinate] | undefined {
	if (coordinates.length === 0) return;
	const coordinatesArray = coordinates.split(":");
	return [
		[14 - Number(coordinatesArray[0].slice(1)), coordinatesArray[0].charCodeAt(0) - 97],
		[14 - Number(coordinatesArray[1].slice(1)), coordinatesArray[1].charCodeAt(0) - 97]
	];
}

export const wrapTag = (baseTag: string, content: string) => `[${baseTag} "${content}"]`;
export const tagNamesEqual = (baseTag: string, definedTag: string) => baseTag.toLowerCase().startsWith(`[${definedTag.toLowerCase()} "`);
export const unwrapTag = (baseTag: string, definedTag: string) => baseTag.replace(`[${definedTag} "`, "").slice(0, -1);
