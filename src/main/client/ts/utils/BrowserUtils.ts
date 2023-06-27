export function downloadFile(filename: string, content: string) {
	const element = document.createElement("a");
	element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
	element.setAttribute("download", `${filename}`);
	element.style.display = "none";

	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

export function assertTargetIsNode(e: EventTarget | null): asserts e is Node {
	if (!e || !("nodeType" in e)) throw new Error("Node expected");
}

export const URL_REGEX =
	/\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))/;
