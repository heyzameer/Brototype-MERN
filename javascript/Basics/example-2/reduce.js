// Reduce function
// 3. reduce()
// Used to accumulate values in an array into a single value (sum, product, max, etc.).
// It takes a callback function that has an accumulator and the current value.



function findSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = arr[i] + sum;
    }
    return sum
}
const arr = [1, 2, 3, 4, 5];
console.log(findSum(arr))




// const result = arr.reduce((accumulator, currentValue) => {
//     return updatedAccumulatorValue;
// }, initialValue);

// accumulator is the accumulated value which is the result of the previous iteration.
// currentValue is the current value in the array.
// initialValue is the initial value of the accumulator. If not provided, the first element of the array
// is used as the initial value.
// updatedAccumulatorValue is the value that will be used in the next iteration.


const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15



const sum2 = numbers.reduce(function sumReducer(acc, num) {
    return acc + num;
}, 0);

console.log(sum2); // 15







function findMax(numbers) {
    let max = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

console.log(findMax(numbers))



const res = numbers.reduce((max, num) => num > max ? num : max , 0)
console.log(res);





