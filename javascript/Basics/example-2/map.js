// Map function
// 1. map()
// Used to create a new array by applying a function to each element of the original array.
// It does not modify the original array.


const numbers = [1, 2, 3, 4, 5];

// Without return ❌ (incorrect)
const doubled = numbers.map(num => { num * 2 });  
console.log(doubled); // [undefined, undefined, undefined, undefined, undefined]

// With return ✅ (correct)
const doubledCorrect = numbers.map(num => { return num * 2 });
console.log(doubledCorrect); // [2, 4, 6, 8, 10]

// Shorter arrow function version ✅
const doubledShort = numbers.map(num => num * 2);
console.log(doubledShort); // [2, 4, 6, 8, 10]
// If you use {} inside an arrow function, you must use return explicitly.
// If you omit {}, the value is implicitly returned.
// Map functions
// function double(x){
//     return x * 2;
// }

// function triple(x){
//     return x * 3;
// }

// function binary(x){
//     return x.toString(2);
// }

// const output = arr.map(double)
// const output2 = arr.map(triple)
// const output3 = arr.map(binary)

// console.log(output);
// console.log(output2);
// console.log(output3);



//  Map function with diff syntax

const output4= arr.map(function binary(x){
    return x.toString(2);
}
)

console.log(output4);


//  Map function with arrow function syntax

const output5= arr.map((x)=>{
    return x.toString(2);
}
)

console.log(output5);



const output6= arr.map((x)=> x.toString(2));

console.log(output6);














