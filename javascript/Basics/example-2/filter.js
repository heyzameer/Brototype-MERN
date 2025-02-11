// 2. filter()
// Used to create a new array with elements that pass a certain condition (return true).
// It does not modify the original array.


const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];




// Filter Odd

function isOdd(num) {
    return num % 2 !== 0;
}

function isEven(num) {
    return num % 2 == 0;
}

const output2 = arr.filter(isOdd);
console.log(output2);

const output3 = arr.filter(isEven);
console.log(output3);





const output1 = arr.filter((x) => x % 2 !== 0);
console.log(output1);

const output0 = arr.filter((x) => x % 2 == 0);
console.log(output0);

const greaterThen4 = arr.filter((x) => x > 4);
console.log(greaterThen4);