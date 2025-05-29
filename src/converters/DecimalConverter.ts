import { type HasInputValidation, addValidInput } from "../validators/input";
import BaseConverter from "./BaseConverter";

export default class DecimalConverter
	extends BaseConverter
	implements HasInputValidation
{
	public constructor() {
		super("Decimal", 10, "", "#DDFFBB");
	}

	public validateInput(event: KeyboardEvent): boolean {
		if (
			event.ctrlKey &&
			(event.key === "v" || event.key === "c" || event.key === "a")
		) {
			return true;
		}

		(event.target as HTMLInputElement).value.replace(/^0+/, "");

		const isValid = addValidInput(/\d/).test(event.key);

		if (!isValid) {
			event.preventDefault();
		}

		return isValid;
	}
}
