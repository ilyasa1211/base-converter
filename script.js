var MAIN = document.querySelector("main");
var INPUTS = document.querySelectorAll("main > input");
var CONVERTER = ["decimal", "octal", "hexadecimal", "binary"];
var CONVERTER_BASE = [10, 8, 16, 2];
var PREFIX = ["", "0o", "0x", "0b"];
var COLOR = ["#DDFFBB", "#C7E9B0", "#B3C99C", "#A4BC92"];
CONVERTER.forEach(function (converter, index) {
    if (!MAIN)
        throw new Error("Missing main element in HTML body");
    if (!INPUTS)
        throw new Error("Missing input element in main element");
    var label = document.createElement("label");
    var input = INPUTS[index];
    label.htmlFor = converter;
    label.innerText = converter;
    label.style.setProperty("--bg", COLOR[index]);
    input.id = converter;
    input.placeholder = "0";
    input.onkeydown = function (event) { return window.keydown(event, converter); };
    input.onkeyup = window.keyup;
    MAIN.appendChild(input);
    MAIN.appendChild(label);
});
function convert(_a, to) {
    var value = _a.value, converter = _a.id;
    var converted = PREFIX[CONVERTER.indexOf(converter)].concat(value);
    var base = CONVERTER_BASE[CONVERTER.indexOf(to)];
    return Number(converted).toString(base);
}
function keyup(event) {
    var target = event.target;
    if (!target.value)
        return;
    INPUTS.forEach(function (input) {
        var toBase = input.id;
        if (input.id === target.id)
            return;
        input.value = convert(target, toBase);
    });
}
function keydown(event, converter) {
    var validInput;
    var validInputPattern = /backspace|arrow+|control|delete/gi;
    switch (converter.toLowerCase()) {
        case "hexadecimal":
            validInput = /[\da-f]/gi;
            validInput = new RegExp(validInput.source + "|" + validInputPattern.source, "gi");
            break;
        case "binary":
            validInput = /[0-1]/gi;
            validInput = new RegExp(validInput.source + "|" + validInputPattern.source, "gi");
            break;
        case "octal":
            validInput = /[0-7]/gi;
            validInput = new RegExp(validInput.source + "|" + validInputPattern.source, "gi");
            break;
        default:
            validInput = /\d/gi;
            validInput = new RegExp(validInput.source + "|" + validInputPattern.source, "gi");
    }
    var isValid = validInput.test(event.key);
    if (!isValid)
        event.preventDefault();
}
