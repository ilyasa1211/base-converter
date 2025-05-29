export interface HasInputValidation {
	/**
	 * @return {boolean} true if valid, false otherwise
	 */
	validateInput(event: KeyboardEvent): boolean;
}

export function isImplHasInputValidation(
	object: object,
): object is HasInputValidation {
	return "validateInput" in object;
}

export function addValidInput(input: RegExp | string) {
	const otherInput = /backspace|arrow+|control|delete|tab/gi;
	const finalInput: string = input instanceof RegExp ? input.source : input;

	return new RegExp(`${finalInput}|${otherInput.source}`, "gi");
}
