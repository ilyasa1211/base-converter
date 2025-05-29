let timeId: number | undefined;

export function copyContentToClipboard<T extends HTMLElement>(
	input: HTMLInputElement,
	infoElement?: T,
): void {
	if (timeId) {
		clearTimeout(timeId);
	}

	navigator.clipboard.writeText(!input.value ? "0" : input.value);

	if (infoElement) {
		infoElement.style.setProperty("visibility", "visible");
		timeId = setTimeout(
			() => infoElement.style.setProperty("visibility", "hidden"),
			3_000,
		);
	}
}
