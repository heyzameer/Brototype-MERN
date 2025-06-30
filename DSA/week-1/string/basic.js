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
