"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promptSync = require("prompt-sync");
var prompt = promptSync();
var charInput = prompt("Enter a character: ");
if (charInput.length === 1) {
    console.log("You entered: ".concat(charInput));
}
else {
    console.log("Please enter only one character.");
}
