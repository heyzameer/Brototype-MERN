
// ----------------------------------- join() Method -----------------------------------
// The join() method is used to join all the elements of an array into a single string, 
// using a specified separator (optional).

// Syntax: array.join(separator);

// separator (optional): A string that separates the elements. 
// If not provided, a comma (`,`) is used by default.

// Example 1: Join array elements with a comma and space
const arr1 = ['apple', 'banana', 'cherry'];
const result1 = arr1.join(', ');  
console.log(result1);  // Output: apple, banana, cherry

// Example 2: Join array elements with a dash
const arr2 = ['apple', 'banana', 'cherry'];
const result2 = arr2.join('-');  
console.log(result2);  // Output: apple-banana-cherry

// Example 3 (default behavior): Default separator is a comma
const arr3 = ['apple', 'banana', 'cherry'];
const result3 = arr3.join();  
console.log(result3);  // Output: apple,banana,cherry

// ----------------------------------- split() Method -----------------------------------
// The split() method is used to split a string into an array of substrings, using a specified separator.

// Syntax: string.split(separator, limit);

// separator (optional): A string or regular expression that specifies where each split should occur. 
// If not provided, the entire string is returned as a single element array.

// limit (optional): Specifies the maximum number of splits.

// Example 1: Split the string by commas
const str1 = 'apple,banana,cherry';
const arr4 = str1.split(',');  
console.log(arr4);  // Output: ['apple', 'banana', 'cherry']

// Example 2: Split the string by spaces
const str2 = 'apple banana cherry';
const arr5 = str2.split(' ');  
console.log(arr5);  // Output: ['apple', 'banana', 'cherry']

// Example 3 (limit): Limit to 2 splits
const str3 = 'apple banana cherry';
const arr6 = str3.split(' ', 2);  
console.log(arr6);  // Output: ['apple', 'banana']

// Example 4 (no separator): No separator, returns the entire string as one element
const str4 = 'apple';
const arr7 = str4.split();  
console.log(arr7);  // Output: ['apple']

// ----------------------------------- Summary -----------------------------------
// `join()` converts an array into a string using a specified separator (or a default comma).
// `split()` converts a string into an array by splitting it based on a specified separator.
