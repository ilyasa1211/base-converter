import { type HasInputValidation, addValidInput } from "../validators/input";
import BaseConverter from "./BaseConverter";

export default class OctalConverter
	extends BaseConverter
	implements HasInputValidation
{
	public constructor() {
		super("Octal", 8, "", "#C7E9B0");
	}

	public validateInput(event: KeyboardEvent): boolean {
		if (
			event.ctrlKey &&
			(event.key === "v" || event.key === "c" || event.key === "a")
		) {
			return true;
		}

		(event.target as HTMLInputElement).value.replace(/^0+/, "");

		const isValid = addValidInput(/[0-7]/).test(event.key);

		if (!isValid) {
			event.preventDefault();
		}

		return isValid;
	}
}
