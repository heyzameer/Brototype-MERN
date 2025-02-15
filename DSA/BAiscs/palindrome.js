// palindrome


const isPalindrome = function(x){
    return x === x.toString().split("").reverse().join("");

}

console.log(isPalindrome(1212));






function isPalindromeTwoPointer(str) {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

console.log(isPalindromeTwoPointer("racecar"));  // true
console.log(isPalindromeTwoPointer("apple"));    // false