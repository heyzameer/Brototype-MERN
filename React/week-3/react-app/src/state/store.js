import { applyMiddleware, createStore } from "redux";
import reducers from "./reducer/index"
import {thunk} from "redux-thunk"

export const store = createStore(reducers,{},applyMiddleware(thunk))


// Without thunk | With thunk
// Action creators must return an object | Action creators can return a function
// Only synchronous updates allowed | Asynchronous (API calls, delays) allowed


// ---

// # 📦 Code you wrote:
// ```javascript
// import { applyMiddleware, createStore } from "redux";
// import reducers from "./reducer/index";
// import { thunk } from "redux-thunk";

// export const store = createStore(reducers, {}, applyMiddleware(thunk));
// ```

// ---

// # 🔥 Explanation:

// ### 1️⃣ `import { applyMiddleware, createStore } from "redux";`
// - `createStore`: function to **create your Redux store**.
// - `applyMiddleware`: lets you **add middleware** like `thunk` into Redux.

// ---

// ### 2️⃣ `import reducers from "./reducer/index";`
// - You are importing **all your combined reducers**.
// - A "reducer" is just a function that **handles actions** and **updates the state**.
// - Your `reducers/index.js` probably looks like this:

// ```javascript
// import { combineReducers } from "redux";
// import amountReducer from "./amountReducer";

// const reducers = combineReducers({
//     amount: amountReducer,
// });

// export default reducers;
// ```

// ✅ So your store knows how to update different slices of state (`amount` here).

// ---

// ### 3️⃣ `import { thunk } from "redux-thunk";`
// 🔴 **Problem here:**  
// You wrote `{ thunk }` but it should be:

// ```javascript
// import thunk from "redux-thunk";
// ```
// 👉 because `redux-thunk` **exports a default** — not a named export `{ thunk }`.

// ---
// > ❗ Fix this line:  
// ✅ Correct:
// ```javascript
// import thunk from "redux-thunk";
// ```

// ---

// ### 4️⃣ `createStore(reducers, {}, applyMiddleware(thunk));`
// - `reducers`: all your reducer functions combined.
// - `{}`: the **initial state** (you are passing empty because reducers already have initial state).
// - `applyMiddleware(thunk)`: adds **Redux Thunk middleware** so you can **write async action creators** (functions inside actions instead of plain objects).

// ✅ So now your store can handle **normal actions** and also **functions** (like API calls or delayed actions) using Thunk.

// ---

// # 🧠 In very simple words:
// | Without thunk                          | With thunk                         |
// |-----------------------------------------|-------------------------------------|
// | Action creators must return an object  | Action creators can return a function |
// | Only synchronous updates allowed       | Asynchronous (API calls, delays) allowed |

// ✅ `redux-thunk` = superpower to dispatch **functions** inside actions.

// ---

// # 🛠 Final corrected version:

// ```javascript
// import { applyMiddleware, createStore } from "redux";
// import reducers from "./reducer/index";
// import thunk from "redux-thunk"; // ✅ Correct way

// export const store = createStore(reducers, {}, applyMiddleware(thunk));
// ```

// ---

// # ✨ Example:

// Imagine an action creator without thunk:

// ```javascript
// export const depositMoney = (amount) => {
//   return {
//     type: "deposit",
//     payload: amount
//   };
// };
// ```

// ✅ Only returns object.

// ---

// But **with thunk**:

// ```javascript
// export const depositMoney = (amount) => {
//   return (dispatch) => {
//     setTimeout(() => {
//       dispatch({
//         type: "deposit",
//         payload: amount
//       });
//     }, 1000);
//   };
// };
// ```
// ✅ You can now **delay dispatch** by 1 second!  
// (Or call an API first, then dispatch.)

// ---

// # 📢 In short:
// - `createStore` → creates the Redux store.
// - `reducers` → tells how to update the store.
// - `applyMiddleware(thunk)` → adds async dispatch capability.
// - You need to import `thunk` correctly!

// ---

// Would you like me to also show how `configureStore()` from Redux Toolkit makes this **even easier** in 2025 projects? 🚀 (it's only 3 lines!)  
// It’s now the *modern way*! 🎯✨