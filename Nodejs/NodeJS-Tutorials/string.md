1.  **Palindrome Check:**
    *   Write a function `isPalindrome(str)` that checks if a given string is a palindrome (reads the same forwards and backward), ignoring case and non-alphanumeric characters.

    ```javascript
    function isPalindrome(str) {
      const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, ""); // Sanitize
      const reversedStr = cleanStr.split("").reverse().join("");
      return cleanStr === reversedStr;
    }
    //Test cases
    console.log(isPalindrome("racecar")); // true
    console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
    console.log(isPalindrome("hello"));   // false
    console.log(isPalindrome(""));        // true

    //Alternative Using two pointers
    function isPalindrome2(str){
      const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, ""); // Sanitize
        let left = 0;
        let right = cleanStr.length - 1;

        while(left < right){
          if(cleanStr[left] !== cleanStr[right]){
            return false;
          }
          left ++;
          right--;
        }
        return true;
    }
    ```

2.  **Count Vowels:**
    *   Write a function `countVowels(str)` that counts the number of vowels (a, e, i, o, u) in a string (case-insensitive).

    ```javascript
    function countVowels(str) {
      const vowelRegex = /[aeiou]/gi; // Use a regular expression
      const matches = str.match(vowelRegex);
      return matches ? matches.length : 0;
    }
    //Test cases
    console.log(countVowels("hello world")); // 3
    console.log(countVowels("AEIOU"));       // 5
    console.log(countVowels("bcdfghjklmnpqrstvwxyz")); // 0
    console.log(countVowels(""));              // 0

    //Alternative using includes
    function countVowels2(str) {
      const vowels = "aeiouAEIOU";
      let count = 0;
      for (let char of str) {
        if (vowels.includes(char)) {
          count++;
        }
      }
      return count;
    }

    

    //Alternative using reduce
    function countVowels3(str){
      const vowels = "aeiouAEIOU";
        return str.split("").reduce((count, char)=>{
            return vowels.includes(char) ? count + 1 : count;
        }, 0)
    }
    ```

3.  **Anagram Check:**
    *   Write a function `areAnagrams(str1, str2)` that checks if two strings are anagrams of each other (contain the same characters, but in a different order), ignoring case and non-alphanumeric characters.

    ```javascript
    function areAnagrams(str1, str2) {
      const cleanStr1 = str1.toLowerCase().replace(/[^a-z0-9]/g, "");
      const cleanStr2 = str2.toLowerCase().replace(/[^a-z0-9]/g, "");

      if (cleanStr1.length !== cleanStr2.length) {
        return false;
      }

      const sortedStr1 = cleanStr1.split("").sort().join("");
      const sortedStr2 = cleanStr2.split("").sort().join("");
      return sortedStr1 === sortedStr2;
    }
    //Test cases
    console.log(areAnagrams("listen", "silent")); // true
    console.log(areAnagrams("hello", "world"));   // false
    console.log(areAnagrams("Dormitory", "dirty room")); // true
    console.log(areAnagrams("a", "A"));           // true
    console.log(areAnagrams("", ""));             // true

    //Alternative using character map
    function areAnagrams2(str1, str2){
      const cleanStr1 = str1.toLowerCase().replace(/[^a-z0-9]/g, "");
      const cleanStr2 = str2.toLowerCase().replace(/[^a-z0-9]/g, "");
      if(cleanStr1.length !== cleanStr2.length){
        return false;
      }
      const charMap1 = buildCharMap(cleanStr1);
      const charMap2 = buildCharMap(cleanStr2);

      for(let char in charMap1){
        if(charMap1[char] !== charMap2[char]){
          return false;
        }
      }
      return true;

      function buildCharMap(str){
        const charMap = {};
        for(let char of str){
          charMap[char] = charMap[char] + 1 || 1;
        }
        return charMap;
      }
    }
    ```

4.  **String Compression:**
    *   Write a function `compressString(str)` that performs basic string compression using the counts of repeated characters.  For example, the string "aabcccccaaa" would become "a2b1c5a3".  If the compressed string is not shorter than the original, return the original string.

    ```javascript
    function compressString(str) {
        if (!str) {
            return str;
        }

        let compressed = "";
        let count = 1;
        for (let i = 0; i < str.length; i++) {
            if (i + 1 < str.length && str[i] === str[i + 1]) {
                count++;
            } else {
                compressed += str[i] + count;
                count = 1;
            }
        }
        return compressed.length < str.length ? compressed : str;
    }
    //Test cases
    console.log(compressString("aabcccccaaa")); // "a2b1c5a3"
    console.log(compressString("abcdef"));      // "abcdef" (no compression)
    console.log(compressString("aaaa"));        // "a4"
    console.log(compressString(""));          // ""
    console.log(compressString("aaBBcc"));       //aaBBcc
    ```

    
5. **Title Case:**
    * Write a function `titleCase(str)` that takes a string and return in Title Case (first letter of each word in capital).

    ```javascript
        function titleCase(str){
            return str.toLowerCase().split(" ").map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(" ");
        }
        //Test cases
        console.log(titleCase("hello world")); //Hello World
        console.log(titleCase("javascript is awesome")); //Javascript Is Awesome
        console.log(titleCase("a"));  //A
        console.log(titleCase("")); // ""

        //Alternative using for loop
        function titleCase2(str){
            const words = str.toLowerCase().split(" ");
            for(let i = 0; i < words.length; i++){
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
            }
            return words.join(" ");
        }