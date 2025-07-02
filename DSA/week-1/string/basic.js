// Here's a **complete and categorized list of important JavaScript string methods** you should know, with explanations and examples.

// ---

// ## ✅ 1. **Basic String Methods**

// | Method              | Description                         | Example                     |
// | ------------------- | ----------------------------------- | --------------------------- |
// | `length`            | Returns length of string            | `"hello".length → 5`        |
// | `charAt(index)`     | Returns character at specific index | `"hello".charAt(1) → 'e'`   |
// | `charCodeAt(index)` | Returns Unicode value of character  | `"A".charCodeAt(0) → 65`    |
// | `toUpperCase()`     | Converts to uppercase               | `"hi".toUpperCase() → 'HI'` |
// | `toLowerCase()`     | Converts to lowercase               | `"HI".toLowerCase() → 'hi'` |

// ---

// ## ✅ 2. **Searching and Matching**

// | Method             | Description                      | Example                                  |
// | ------------------ | -------------------------------- | ---------------------------------------- |
// | `includes(sub)`    | Checks if substring exists       | `"hello".includes("ell") → true`         |
// | `indexOf(sub)`     | First index of substring         | `"hello".indexOf("l") → 2`               |
// | `lastIndexOf(sub)` | Last index of substring          | `"hello".lastIndexOf("l") → 3`           |
// | `startsWith(sub)`  | Checks if string starts with sub | `"JavaScript".startsWith("Java") → true` |
// | `endsWith(sub)`    | Checks if string ends with sub   | `"notes.txt".endsWith(".txt") → true`    |
// | `match(regex)`     | Returns match from regex         | `"abc123".match(/\d+/) → ['123']`        |

// ---

// ## ✅ 3. **Extracting Substrings**

// | Method                  | Description                            | Example                           |
// | ----------------------- | -------------------------------------- | --------------------------------- |
// | `slice(start, end)`     | Extracts part of string                | `"hello".slice(1, 4) → 'ell'`     |
// | `substring(start, end)` | Similar to slice (no negative index)   | `"hello".substring(1, 4) → 'ell'` |
// | `substr(start, length)` | Deprecated, but returns part of string | `"hello".substr(1, 3) → 'ell'`    |

// ---

// ## ✅ 4. **Modifying Strings**

// | Method                   | Description                    | Example                                   |
// | ------------------------ | ------------------------------ | ----------------------------------------- |
// | `replace(old, new)`      | Replaces first match           | `"1+2=3".replace("1", "one") → 'one+2=3'` |
// | `replaceAll(old, new)`   | Replaces all matches (ES2021+) | `"haha".replaceAll("a", "o") → 'hoho'`    |
// | `trim()`                 | Removes spaces from both ends  | `"  hi  ".trim() → 'hi'`                  |
// | `trimStart()`            | Removes leading spaces         | `"  hi".trimStart() → 'hi'`               |
// | `trimEnd()`              | Removes trailing spaces        | `"hi  ".trimEnd() → 'hi'`                 |
// | `padStart(length, char)` | Pads from left                 | `"5".padStart(3, "0") → '005'`            |
// | `padEnd(length, char)`   | Pads from right                | `"5".padEnd(3, "0") → '500'`              |

// ---

// ## ✅ 5. **Splitting and Joining**

// | Method              | Description                           | Example                              |
// | ------------------- | ------------------------------------- | ------------------------------------ |
// | `split(separator)`  | Splits string into array by separator | `"a,b,c".split(",") → ['a','b','c']` |
// | `join()` (on array) | Joins array elements into string      | `["a","b"].join("-") → "a-b"`        |

// ---

// ## ✅ 6. **Repeating and Comparing**

// | Method            | Description                           | Example                       |
// | ----------------- | ------------------------------------- | ----------------------------- |
// | `repeat(n)`       | Repeats string `n` times              | `"hi".repeat(3) → 'hihihi'`   |
// | `localeCompare()` | Compares two strings (alphabetically) | `"a".localeCompare("b") → -1` |

// ---

// ## ✅ 7. **Template Literals (Backticks)**

// ```javascript
// let name = "Zameer";
// console.log(`Hello, ${name}!`); // → Hello, Zameer!
// ```

// ---

// ## 🔍 Bonus: Regex with `replace()` and `match()`

// ```javascript
// "abc123".replace(/\d+/g, '')  // → "abc" (remove numbers)
// "hello123".match(/\d+/g)      // → ["123"]
// ```

// ---

// ## 🧠 Practice Tips:

// Try these:

// ```js
// // Reverse a string
// console.log("hello".split('').reverse().join(''));

// // Capitalize first letter
// let word = "hello";
// console.log(word.charAt(0).toUpperCase() + word.slice(1));
// ```

// ---

// Would you like a **quiz**, **interview questions**, or practice problems on these methods?


// function shiftStringByN(str, n) {
//   let result = "";

//   for (let char of str) {
//     if (/[a-zA-Z]/.test(char)) {
//       let base = char === char.toLowerCase() ? 97 : 65;
//       let code = ((char.charCodeAt(0) - base + n) % 26 + 26) % 26 + base;
//       result += String.fromCharCode(code);
//     } else {
//       result += char; // keep spaces, symbols, etc.
//     }
//   }

//   return result;
// }
// console.log(shiftStringByN("abc", 2));      // "cde"
// console.log(shiftStringByN("Zebra!", 1));   // "Afcsb!"
// console.log(shiftStringByN("xyz", 3));      // "abc"


function isPalindrome(str) {
  str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return str === str.split('').reverse().join('');
}

console.log(isPalindrome("madam"));       // true
console.log(isPalindrome("race car"));    // true
console.log(isPalindrome("hello"));       // false


function isAnagram(str1, str2) {
  let format = s => s.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
  return format(str1) === format(str2);
}

console.log(isAnagram("listen", "silent"));   // true
console.log(isAnagram("hello", "world"));     // false


function countVowelsAndConsonants(str) {
  let vowels = "aeiou";
  let vCount = 0, cCount = 0;

  for (let ch of str.toLowerCase()) {
    if (/[a-z]/.test(ch)) {
      if (vowels.includes(ch)) vCount++;
      else cCount++;
    }
  }

  return { vowels: vCount, consonants: cCount };
}

console.log(countVowelsAndConsonants("Hello World"));  
// Output: { vowels: 3, consonants: 7 }





function reverseEachWordManual(str) {
  let words = str.split(' ');
  let result = [];

  for (let word of words) {
    let reversed = '';
    for (let i = word.length - 1; i >= 0; i--) {
      reversed += word[i];
    }
    result.push(reversed);
  }

  return result.join(' ');
}

console.log(reverseEachWordManual("HELLO WORLD")); // → OLLEH DLROW







function reverseStringManual(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log(reverseStringManual("hello world")); // → "dlrow olleh"









