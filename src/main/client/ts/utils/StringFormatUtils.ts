export function formatOrdinalNumber(num: number): string {
	const lastTwoDigits = Number(String(num).slice(-2));
	if (lastTwoDigits > 3 && lastTwoDigits < 21) return `${num}th`;
	switch (lastTwoDigits % 10) {
		case 1:
			return `${num}st`;
		case 2:
			return `${num}nd`;
		case 3:
			return `${num}rd`;
		default:
			return `${num}th`;
	}
}

export function compileEnumeration(list: string[]): string {
	if (list.length === 0) return "";
	if (list.length === 1) return list[0];
	let result = "";
	for (let i = 0; i < list.length; i++) {
		if (i === list.length - 2) {
			result += ` ${list[i]} or `;
		} else if (i === list.length - 1) {
			result += list[i];
		} else {
			result += list[i] + ", ";
		}
	}

	return result;
}

export function prefixWithIndefiniteArticle(str: string): string {
	const vowels = /[AEUIO]/i;
	return vowels.test(str.charAt(0)) ? "an " + str : "a " + str;
}

export function convertSecondsToFlexibleHoursMinutesSeconds(seconds: number): string {
	if (seconds >= 3600) {
		return new Date(seconds * 1000).toISOString().substring(11, 16);
	} else {
		return new Date(seconds * 1000).toISOString().substring(14, 19);
	}
}

export function convertCamelCaseToKebabCase(baseString: string): string {
	return baseString.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function convertCamelCaseToWording(baseString: string): string {
	return baseString.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ").map(s => s[0].toUpperCase() + s.slice(1)).join(" ");
}

export function hashString(string: string): number {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		const char = string.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0;
	}

	return hash;
}
