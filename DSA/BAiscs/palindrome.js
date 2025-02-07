// palindrome


const isPalindrome = function(x){
    return x === x.toString().split("").reverse().join("");

}

console.log(isPalindrome(1212));