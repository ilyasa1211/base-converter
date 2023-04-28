const MAIN = document.querySelector("main");
const INPUTS = document.querySelectorAll<HTMLInputElement>("main > input");
const INFO = document.querySelector<HTMLParagraphElement>("header > p");
const CONVERTER = ["decimal", "octal", "hexadecimal", "binary"];
const CONVERTER_BASE = [10, 8, 16, 2];
const PREFIX = ["", "0o", "0x", "0b"];
const COLOR = ["#DDFFBB", "#C7E9B0", "#B3C99C", "#A4BC92"];
var timeId: number = 0;

CONVERTER.forEach(function (converter, index): void {
  if (!MAIN) throw new Error("Missing main element in HTML body");
  if (!INPUTS) throw new Error("Missing input element in main element");
  var label = document.createElement("label");
  var input = <HTMLInputElement> INPUTS[index];
  label.htmlFor = converter;
  label.innerText = converter;
  label.style.setProperty("--bg", COLOR[index]);
  label.onclick = () => window.copy(input);
  input.id = converter;
  input.placeholder = "0";
  input.onkeydown = (event) => validateInput(event, converter);
  input.onkeyup = window.calculate;
  MAIN.appendChild(input);
  MAIN.appendChild(label);
});

function copy(input: HTMLInputElement): void {
  clearTimeout(window.timeId);
  let info = INFO as HTMLParagraphElement;
  window.navigator.clipboard.writeText(input.value);
  info.style.display = "block";
  window.timeId = window.setTimeout(() => (info.style.display = "none"), 3_000);
}

function convert(
  { value, id: converter }: { value: string; id: string },
  to: string,
): string {
  let converted = PREFIX[CONVERTER.indexOf(converter)].concat(value);
  let base = CONVERTER_BASE[CONVERTER.indexOf(to)];
  return Number(converted).toString(base);
}

function calculate(event: KeyboardEvent): void {
  let target = <HTMLInputElement> event.target;
  const inputField = { value: target.value, id: target.id };
  if (!inputField.value) inputField.value = "0";
  INPUTS.forEach(function (input) {
    let toBase = input.id;
    if (input.id === target.id) return;
    (<HTMLInputElement> input).value = convert(inputField, toBase);
  });
}
function validateInput(event: KeyboardEvent, converter: string): void {
  if (
    event.ctrlKey &&
    (event.key === "v" || event.key === "c" || event.key === "a")
  ) {
    return;
  }
  let validInput: RegExp;
  let target = <HTMLInputElement> event.target;
  target.value = target.value.replace(/^0+/, "");
  switch (converter.toLowerCase()) {
    case "hexadecimal":
      validInput = addInput(/[\da-f]/);
      break;
    case "binary":
      validInput = addInput(/[0-1]/);
      break;
    case "octal":
      validInput = addInput(/[0-7]/);
      break;
    default:
      validInput = addInput(/\d/);
  }
  let isValid = validInput.test(event.key);
  if (!isValid) event.preventDefault();
}

function addInput(input: RegExp | string) {
  const otherInput = /backspace|arrow+|control|delete/gi;
  let finalInput: string = input instanceof RegExp ? input.source : input;
  return new RegExp(finalInput + "|" + otherInput.source, "gi");
}
