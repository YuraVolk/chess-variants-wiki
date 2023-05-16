export function truncateNumber(number: number, digits: number): number {
	const multiplier = Math.pow(10, digits);
	const adjusted = number * multiplier;
	if (adjusted < 0) {
		return Math.ceil(adjusted / multiplier);
	} else {
		return Math.floor(adjusted / multiplier);
	}
}

export function bitCount(number: number): number {
	number = number - ((number >> 1) & 0x55555555);
	number = (number & 0x33333333) + ((number >> 2) & 0x33333333);
	return (((number + (number >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
}
