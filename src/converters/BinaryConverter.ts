import { type HasInputValidation, addValidInput } from "../validators/input.ts";
import BaseConverter from "./BaseConverter.ts";

export default class BinaryConverter
	extends BaseConverter
	implements HasInputValidation
{
	public constructor() {
		super("Binary", 2, "0b", "#A4BC92");
	}

	public validateInput(event: KeyboardEvent): boolean {
		if (
			event.ctrlKey &&
			(event.key === "v" || event.key === "c" || event.key === "a")
		) {
			return true;
		}

		(event.target as HTMLInputElement).value.replace(/^0+/, "");

		const isValid = addValidInput(/[0-1]/).test(event.key);

		if (!isValid) {
			event.preventDefault();
		}

		return isValid;
	}
}
