// Here are the solutions to the practical interview questions you were asked in **Week 3**:

// ---

// ### **1. Remove Duplicates Using `filter()`**
// You can remove duplicates from an array using `filter()` by checking if the index of the current element is the same as the first occurrence of that element.

// #### **Solution:**
// ```javascript
// const numbers = [1, 2, 3, 2, 4, 3, 5, 1];

// const uniqueNumbers = numbers.filter((value, index, array) => {
//     return array.indexOf(value) === index;
// });

// console.log(uniqueNumbers); // Output: [1, 2, 3, 4, 5]
// ```
// ✅ **Explanation:**  
// - `indexOf(value)` returns the first occurrence of `value` in the array.
// - If `index === indexOf(value)`, it means the element appears for the first time, so it is kept in the result.

// ---

// ### **2. Merge Arrays Using Spread (`...`)**
// You can merge multiple arrays using the **spread operator**.

// #### **Solution:**
// ```javascript
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];

// const mergedArray = [...arr1, ...arr2];

// console.log(mergedArray); // Output: [1, 2, 3, 4, 5, 6]
// ```
// ✅ **Explanation:**  
// - The spread operator (`...`) expands elements of `arr1` and `arr2`, creating a new merged array.

// ---

// ### **3. Assign Values to Three Variables Using Spread (`...`)**
// You can use array destructuring along with the spread operator.

// #### **Solution:**
// ```javascript
// const values = [10, 20, 30, 40, 50];

// const [a, b, c] = values;

// console.log(a, b, c); // Output: 10 20 30
// ```
// ✅ **Explanation:**  
// - `[a, b, c] = values` assigns the first three elements to `a`, `b`, and `c` respectively.
// - The remaining values are ignored unless you use the rest operator (`...rest`).

// #### **Alternative (Using Rest Operator)**
// ```javascript
// const [x, y, ...rest] = values;

// console.log(x, y, rest); // Output: 10 20 [30, 40, 50]
// ```
// ---

// ### **4. Equality Checks (`==` and `===`)**
// Let's evaluate:

// #### **Code:**
// ```javascript
// console.log("undefine" == null); // false
// console.log(null == null); // true
// ```

// #### **Explanation:**
// 1. `"undefine" == null` → **`false`**
//    - `"undefine"` is a string, and `null` is a special primitive.
//    - Since `"undefine"` is not `undefined` or `null`, JavaScript doesn't consider them equal.

// 2. `null == null` → **`true`**
//    - `null` is **loosely** equal (`==`) to itself.

// ---

// ### **Summary:**
// | Question | Solution |
// |----------|----------|
// | Remove Duplicates Using `filter()` | `array.filter((val, index, arr) => arr.indexOf(val) === index);` |
// | Merge Arrays Using Spread | `const merged = [...arr1, ...arr2];` |
// | Assign Values Using Spread | `[a, b, c] = values;` |
// | `"undefine" == null` | `false` |
// | `null == null` | `true` |

// Let me know if you need more explanations! 🚀