// # **Symbols in JavaScript (ES6+) – In-Depth Explanation**

// A **Symbol** in JavaScript is a **unique and immutable** primitive data type introduced in ES6. Symbols are mainly used to create **property keys that won't collide** with other property keys in objects.

// ---

// ## **1. Creating Symbols**
// Symbols are created using the `Symbol()` function.

// ```javascript
// let sym1 = Symbol();
// let sym2 = Symbol();
// console.log(sym1 === sym2); // false (Each symbol is unique)
// ```
// - **Each call to `Symbol()` creates a new, unique value.**
// - Even if two symbols are created with the same description, they are still unique.

// ---

// ## **2. Symbols with Descriptions**
// While symbols are unique, we can give them descriptions for debugging purposes.

// ```javascript
// let sym = Symbol("mySymbol");
// console.log(sym.description); // "mySymbol"
// ```
// - **Descriptions do not affect uniqueness**; they only help in debugging.

// ---

// ## **3. Symbols as Object Keys**
// One of the main uses of symbols is **to define unique object properties**.

// ```javascript
// let mySymbol = Symbol("id");

// let user = {
//     name: "Alice",
//     age: 25,
//     [mySymbol]: 12345 // Using symbol as a property key
// };

// console.log(user[mySymbol]); // 12345
// console.log(Object.keys(user)); // ["name", "age"] (Symbol is hidden)
// console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id)]
// ```
// ✅ **Benefits of Using Symbols as Object Keys:**
// - **They do not appear in `Object.keys()` or `for...in` loops** (non-enumerable).
// - **They prevent accidental property name clashes.**

// ---

// ## **4. Sharing Symbols with `Symbol.for()`**
// While `Symbol()` creates a unique symbol every time, `Symbol.for()` allows symbols to be shared **globally**.

// ```javascript
// let sym1 = Symbol.for("shared");
// let sym2 = Symbol.for("shared");

// console.log(sym1 === sym2); // true (retrieved from global registry)
// ```
// ✅ **Differences:**
// - `Symbol("key")` → Always unique, even if the description matches.
// - `Symbol.for("key")` → Checks in a **global registry** and returns the same symbol if it exists.

// We can also retrieve the key using `Symbol.keyFor()`:

// ```javascript
// console.log(Symbol.keyFor(sym1)); // "shared"
// ```

// ---

// ## **5. Well-Known Symbols**
// JavaScript provides **built-in symbols** known as "Well-Known Symbols" that define behavior for built-in JavaScript methods.

// | Symbol | Description |
// |--------|------------|
// | `Symbol.iterator` | Defines the default iterator for an object. |
// | `Symbol.toStringTag` | Customizes `Object.prototype.toString()`. |
// | `Symbol.toPrimitive` | Controls primitive conversion of an object. |
// | `Symbol.hasInstance` | Customizes `instanceof` behavior. |

// ### **Example: `Symbol.iterator`**
// ```javascript
// let iterableObj = {
//     data: [1, 2, 3],
//     [Symbol.iterator]() {
//         let index = 0;
//         return {
//             next: () => {
//                 if (index < this.data.length) {
//                     return { value: this.data[index++], done: false };
//                 } else {
//                     return { done: true };
//                 }
//             }
//         };
//     }
// };

// for (let value of iterableObj) {
//     console.log(value); // 1, 2, 3
// }
// ```
// - This makes `iterableObj` **iterable** so it can be used in `for...of` loops.

// ---

// ## **6. Symbols and JSON**
// Symbols are **ignored** when converting objects to JSON.

// ```javascript
// let obj = {
//     name: "Bob",
//     [Symbol("id")]: 101
// };

// console.log(JSON.stringify(obj)); // {"name":"Bob"} (Symbol is ignored)
// ```
// - **Symbols are not included in JSON serialization.**
// - They are primarily used for internal or private properties.

// ---

// ## **7. When to Use Symbols?**
// ✅ **Best use cases for symbols:**
// 1. **Unique Property Keys** - Prevent accidental property name collisions.
// 2. **Hiding Properties** - Symbols are not included in `for...in`, `Object.keys()`, or `JSON.stringify()`.
// 3. **Custom Object Behavior** - Use **Well-Known Symbols** like `Symbol.iterator` to define object behavior.

// ---

// ## **8. Summary Table**
// | Feature | `Symbol()` | `Symbol.for()` |
// |---------|-----------|---------------|
// | **Uniqueness** | Always unique | Shared across global registry |
// | **Description** | Optional | Optional |
// | **Usage as Key** | Yes | Yes |
// | **Retrievable?** | No | Yes (`Symbol.keyFor()`) |
// | **Well-Known Symbols?** | No | Yes (`Symbol.iterator`, etc.) |

// ---

// ## **Conclusion**
// - **Symbols provide uniqueness and prevent property conflicts.**
// - **They are useful for defining hidden properties.**
// - **`Symbol.for()` enables shared symbols globally.**
// - **They are ignored in JSON but play a key role in JavaScript internals.**

// Would you like to see more advanced examples? 🚀