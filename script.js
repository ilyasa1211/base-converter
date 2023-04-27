const MAIN = document.querySelector("main");
const INPUTS = document.querySelectorAll("main > input");
const CONVERTER = ["decimal", "octal", "hexadecimal", "binary"];
const CONVERTER_BASE = [10, 8, 16, 2];
const COLOR = ["#DDFFBB", "#C7E9B0", "#B3C99C", "#A4BC92"];
const HEX_ADDITIONAL = ["a", "b", "c", "d", "e", "f"];

CONVERTER.forEach(function (converter, index) {
    if (!MAIN) throw new Error("Missing main element in HTML body");
    if (!INPUTS) throw new Error("Missing input element in main element");
    var label = document.createElement("label");
    var input = INPUTS[index];
    label.htmlFor = converter;
    label.innerText = converter;
    label.style.setProperty("--bg", COLOR[index]);
    input.id = converter;
    input.placeholder = "0";
    input.onkeydown = (event) => window.keydown(event, converter);
    input.onkeyup = window.keyup;
    MAIN.appendChild(input);
    MAIN.appendChild(label);
});

function convert({ value, id: converter }, to) {
    let convertedResult;
    switch (converter) {
        case "decimal":
            convertedResult = window.decimal(value, to);
            break;
        case "octal":
            convertedResult = window.octal(value, to);
            break;
        case "hexadecimal":
            convertedResult = window.hexadecimal(value, to);
            break;
        case "binary":
            convertedResult = window.binary(value, to);
            break;
        default:
            convertedResult = null;
    }
    return convertedResult;
}

function keyup(event) {
    if (!event.target.value) return false;
    INPUTS.forEach(function (input) {
        let toBase = input.id;
        if (input.id === event.target.id) return;
        input.value = convert(event.target, toBase);
    });
}
function keydown(event, converter) {
    var validInput;
    var validInputPattern = /backspace|arrow+|control|delete/gi;
    switch (converter.toLowerCase()) {
        case "hexadecimal":
            validInput = /[\da-f]/gi;
            validInput = new RegExp(
                validInput.source + "|" + validInputPattern.source,
                "gi",
            );
            break;
        case "binary":
            validInput = /[0-1]/gi;
            validInput = new RegExp(
                validInput.source + "|" + validInputPattern.source,
                "gi",
            );
            break;
        case "octal":
            validInput = /[0-7]/gi;
            validInput = new RegExp(
                validInput.source + "|" + validInputPattern.source,
                "gi",
            );
            break;
        default:
            validInput = /\d/gi;
            validInput = new RegExp(
                validInput.source + "|" + validInputPattern.source,
                "gi",
            );
    }
    var isValid = validInput.test(event.key);
    if (!isValid) event.preventDefault();
}

function decimal(value, to) {
    let base = CONVERTER_BASE[CONVERTER.indexOf(to)];
    return Number(value).toString(base);
}
function hexadecimal(value, to) {
    let base = CONVERTER_BASE[CONVERTER.indexOf(to)];
    let split = value.split('').map(value => {
        find = String(HEX_ADDITIONAL.find(_ => value === _))
        if (find === "undefined") return value
        return find.charCodeAt() - 87
    });
    let result = [];
    switch (to) {
        case "decimal":
            result = split.map((value, index) => {
                return Number(value) * Math.pow(16, split.length - 1 - index)
            }).reduce((prev, curr) => prev + curr);
            break;
        case "octal":
        default:
            result = ["1", "99"];
            break;
    }
    return result
}
function octal(params) {
    return 199;
}
function binary(params) {
    return 199;
}
