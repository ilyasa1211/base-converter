import { type HasInputValidation, addValidInput } from "../validators/input";
import BaseConverter from "./BaseConverter";

export default class HexadecimalConverter
	extends BaseConverter
	implements HasInputValidation
{
	public constructor() {
		super(HexadecimalConverter.name, 16, "0x", "#B3C99C");
	}

	public validateInput(event: KeyboardEvent): boolean {
		if (
			event.ctrlKey &&
			(event.key === "v" || event.key === "c" || event.key === "a")
		) {
			return true;
		}

		(event.target as HTMLInputElement).value.replace(/^0+/, "");

		const isValid = addValidInput(/[\da-f]/).test(event.key);

		if (!isValid) {
			event.preventDefault();
		}

		return isValid;
	}
}
