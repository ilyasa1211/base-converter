export default abstract class BaseConverter {
	private value?: string;
	private readonly name: string;
	private readonly base: number;
	private readonly prefix: string;
	private readonly color: `#${string}`;

	public constructor(
		name = "default converter",
		base = 10,
		prefix = "",
		color: `#${string}` = "#FFFFFF",
	) {
		this.name = name;
		this.base = base;
		this.prefix = prefix;
		this.color = color;
	}

	public getName() {
		return this.name;
	}

	public getColor() {
		return this.color;
	}

	public getPrefix() {
		return this.prefix;
	}

	public getBase() {
		return this.base;
	}

	public getValue() {
		return this.value;
	}

	public setValue(value: typeof this.value) {
		this.value = value;
	}

	public convertTo<T extends BaseConverter>(converter: T) {
		if (!this.value) {
			return "" as const;
		}

		const number = Number(`${this.prefix}${this.value}`);

		if (Number.isNaN(number)) {
			return "" as const;
		}

		return number.toString(converter.getBase());
	}
}
