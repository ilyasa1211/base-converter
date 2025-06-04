import "./style.css";
import type BaseConverter from "./converters/BaseConverter";
import BinaryConverter from "./converters/BinaryConverter";
import DecimalConverter from "./converters/DecimalConverter";
import HexadecimalConverter from "./converters/HexadecimalConverter";
import OctalConverter from "./converters/OctalConverter";
import { copyContentToClipboard } from "./utitilies/common";
import { isImplHasInputValidation } from "./validators/input";

export default class Main {
	private inputRegistry: HTMLInputElement[] = [];
	private converters: Array<BaseConverter> = [];

	public main(main: HTMLElement, infoElement?: HTMLElement): void {
		if (!main) {
			throw new Error("main element not found");
		}

		this.converters.push(
			new BinaryConverter(),
			new DecimalConverter(),
			new HexadecimalConverter(),
			new OctalConverter(),
		);

		for (const converter of this.converters) {
			const label = Object.assign(document.createElement("label"), {
				htmlFor: converter.getName(),
				innerText: converter.getName(),
				onclick: () => copyContentToClipboard(input, infoElement),
			});

			label.style.setProperty("--bg", converter.getColor());

			const input = Object.assign(document.createElement("input"), {
				id: converter.getName(),
				placeholder: "0",
				onkeydown: isImplHasInputValidation(converter)
					? converter.validateInput
					: () => {},
				onkeyup: (e: KeyboardEvent) => {
					const target = e.target as HTMLInputElement;
					converter.setValue(target.value);
					this.calculateEach(e, converter);
				},
			});

			const div = Object.assign(document.createElement("div"), {});

			div.appendChild(input);
			div.appendChild(label);

			this.inputRegistry.push(input);

			main!.appendChild(div);
		}
	}

	private calculateEach<T extends BaseConverter>(
		event: KeyboardEvent,
		from: T,
	): void {
		const target = event.target as HTMLInputElement;

		if (!target.value) target.value = "";

		for (const [index, input] of this.inputRegistry.entries()) {
			// skip self calculation
			if (input.id === target.id) continue;

			input.value = from.convertTo(this.converters.at(index)!);
		}
	}
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="body">
    <div id="header">
      <p id="info" class="visibility: hidden;">Successfully Copied to Clipboard!</p>
    </div>
    <div id="main">
    </div>
  </div>
`;

const main = new Main();

main.main(
	document.querySelector<HTMLDivElement>("#main")!,
	document.querySelector<HTMLDivElement>("#info")!,
);
