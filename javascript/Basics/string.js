// Everything about Strings in JavaScript

// 1. String Definition
// A string is a sequence of characters enclosed in single quotes (' ') or double quotes (" ") or backticks (` ` for template literals).

let str1 = "Hello, World!";
let str2 = 'JavaScript is awesome';
let str3 = `Template literals are cool`;

// 2. Creating Strings
// You can create strings using single quotes, double quotes, or backticks (template literals).
let singleQuoteStr = 'Single quotes';
let doubleQuoteStr = "Double quotes";
let templateStr = `Template literals`;

// 3. String Length
// You can get the length of a string using the .length property.
let length = str1.length; // Returns the length of the string
console.log(length); // Output: 13

// 4. Accessing Characters in a String
// You can access individual characters in a string using bracket notation or the .charAt() method.
let charAtZero = str1.charAt(0); // First character of the string
console.log(charAtZero); // Output: "H"

let charAtOne = str1[1]; // First character of the string using bracket notation
console.log(charAtOne); // Output: "e"

// 5. String Concatenation
// You can concatenate two or more strings using the + operator or template literals.

let firstName = "John";
let lastName = "Doe";

// Using + operator
let fullName = firstName + " " + lastName;
console.log(fullName); // Output: "John Doe"

// Using template literals
let fullNameTemplate = `${firstName} ${lastName}`;
console.log(fullNameTemplate); // Output: "John Doe"

// 6. String Methods
// a. .toUpperCase() - Converts a string to uppercase
let upperCaseStr = str1.toUpperCase();
console.log(upperCaseStr); // Output: "HELLO, WORLD!"

// b. .toLowerCase() - Converts a string to lowercase
let lowerCaseStr = str2.toLowerCase();
console.log(lowerCaseStr); // Output: "javascript is awesome"

// c. .includes() - Checks if a string contains a specified substring
let hasWord = str1.includes("World");
console.log(hasWord); // Output: true

// d. .indexOf() - Returns the index of the first occurrence of a substring
let indexOfWord = str1.indexOf("World");
console.log(indexOfWord); // Output: 7 (index starts from 0)

// e. .slice() - Extracts a part of a string, returns a new string
let slicedStr = str1.slice(0, 5); // Extracts characters from index 0 to 4
console.log(slicedStr); // Output: "Hello"

// f. .substring() - Similar to slice(), but doesn't accept negative indexes
let substringStr = str1.substring(7, 12); // Extracts characters from index 7 to 11
console.log(substringStr); // Output: "World"

// g. .replace() - Replaces a substring with a new substring
let replacedStr = str1.replace("World", "Universe");
console.log(replacedStr); // Output: "Hello, Universe!"

// h. .trim() - Removes whitespace from both ends of a string
let stringWithSpaces = "  Hello, World!  ";
let trimmedStr = stringWithSpaces.trim();
console.log(trimmedStr); // Output: "Hello, World!"

// i. .split() - Splits a string into an array of substrings based on a separator
let words = str1.split(" ");
console.log(words); // Output: [ 'Hello,', 'World!' ]

// j. .concat() - Joins two or more strings into one
let concatenatedStr = firstName.concat(" ", lastName);
console.log(concatenatedStr); // Output: "John Doe"

// 7. Template Literals (String Interpolation)
// Template literals allow you to embed expressions inside a string using `${}`.
let age = 25;
let greeting = `Hello, my name is ${firstName} and I am ${age} years old.`;
console.log(greeting); // Output: "Hello, my name is John and I am 25 years old."

// 8. Escape Characters in Strings
// Use backslashes (\) to escape special characters like quotes, newlines, etc.
let escapedStr = "This is a string with \"escaped\" quotes.";
console.log(escapedStr); // Output: "This is a string with "escaped" quotes."

// 9. Multi-line Strings (Using Template Literals)
let multiLineString = `This is a string
that spans
multiple lines.`;
console.log(multiLineString);
// Output:
// "This is a string
// that spans
// multiple lines."

// 10. String Immutability
// Strings in JavaScript are immutable, meaning once created, their values cannot be changed. Modifications return a new string.
let modifiedStr = str1.replace("World", "Everyone");
console.log(modifiedStr); // Output: "Hello, Everyone!"
console.log(str1); // Original string is unchanged: "Hello, World!"

// 11. String Padding
// a. .padStart() - Pads the current string with another string from the start.
let paddedStrStart = "5".padStart(3, "0"); // Pads to make the string length 3
console.log(paddedStrStart); // Output: "005"

// b. .padEnd() - Pads the current string with another string from the end.
let paddedStrEnd = "5".padEnd(3, "0"); // Pads to make the string length 3
console.log(paddedStrEnd); // Output: "500"

// 12. String Comparison
// Strings are compared lexicographically (alphabetically).
let comparisonResult = "apple" > "banana"; // Returns false because "apple" comes before "banana"
console.log(comparisonResult); // Output: false







// Key Points:
// String Creation: Strings can be created using single quotes, double quotes, or backticks (template literals).
// String Methods: There are various methods available for string manipulation like .toUpperCase(), .toLowerCase(), .slice(), .replace(), .split(), .trim(), etc.
// Immutability: Strings are immutable in JavaScript, meaning their values cannot be changed after creation. Operations on strings return new strings.
// Template Literals: Template literals allow embedding expressions inside strings using ${} for easier string formatting.
// Escape Characters: Special characters in strings can be escaped using a backslash (\) for quotes, newlines, etc.
// String Padding: Use .padStart() and .padEnd() for padding strings with specified characters