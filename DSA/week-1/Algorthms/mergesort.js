function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [], i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }

    while (i < left.length) {
        result.push(left[i++]);
    }

    while (j < right.length) {
        result.push(right[j++]);
    }

    return result;

}

console.log(mergeSort([5, 2, 4, 1, 3]));
// Output: [1, 2, 3, 4, 5]

// | Metric           | Value          |
// | ---------------- | -------------- |
// | Time Complexity  | **O(n log n)** |
// | Space Complexity | **O(n)**       |
