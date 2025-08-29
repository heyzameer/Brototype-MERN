"use strict";
// Basic Types
// Primitive types (number, string, boolean)
// Arrays
// Tuples
// Enums
//Any, Unknown, Void, Null, Undefined, Never
// type inference
// type annotations
Object.defineProperty(exports, "__esModule", { value: true });
const user = {
    name: "Alice",
    age: 25
};
function greet(person) {
    console.log(`Hello, ${person.name}!`);
}
// Using the interface
greet(user);
