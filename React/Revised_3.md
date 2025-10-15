
---

## 🧠 1. Theory — What and Why Redux?

### 🔹 What is Redux?

**Redux** is a **predictable state management library** for JavaScript apps — mainly used with React.
It helps you manage **global state** (data shared across multiple components) in a consistent, centralized way.

Think of Redux as a **single storage room** where you keep all your important data,
and React components can **request or update** that data without passing props all over.

---

### 🔹 Why Redux?

React’s state works fine for small apps — but as the app grows:

* Data has to be **passed between distant components (prop drilling)**.
* Updating or synchronizing data between components becomes hard.
* Debugging state changes is difficult.

Redux solves these issues by:
✅ Having **a single source of truth (store)**.
✅ Enforcing **unidirectional data flow**.
✅ Logging every state change — making debugging easy.

---

## 🏗️ 2. Redux Architecture

Redux follows a **unidirectional data flow** (one-way loop).
Here’s the flow:

```
    ┌──────────┐
    │  Action  │   → describes “what happened”
    └─────┬────┘
          ↓
    ┌──────────┐
    │ Reducer  │   → updates state based on the action
    └─────┬────┘
          ↓
    ┌──────────┐
    │  Store   │   → holds the complete application state
    └─────┬────┘
          ↓
    ┌────────────┐
    │  React UI  │   → subscribes and re-renders on state change
    └────────────┘
```

Let’s understand each piece 👇

---

## 🧩 3. Core Concepts of Redux

### 🧱 a) **Store**

* The **central place** that holds your entire app’s state.
* Created using `createStore()` (or `configureStore()` in Redux Toolkit).

```js
import { createStore } from 'redux';
import counterReducer from './counterReducer';

const store = createStore(counterReducer);
export default store;
```

### ✅ Characteristics:

* Only **one store per application** (Single Source of Truth).
* You cannot directly modify state — must use **actions**.
* Components **subscribe** to get updates.

---

### ⚡ b) **Action**

An action is a **plain JavaScript object** describing **what happened**.

```js
const incrementAction = {
  type: 'INCREMENT',
  payload: 1
};
```

### ✅ Characteristics:

* Must have a `type` property (string).
* Can include optional `payload` (data).

---

### 🔁 c) **Reducer**

A **pure function** that takes the current state and an action, and returns a new state.

```js
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + action.payload };
    case 'DECREMENT':
      return { count: state.count - action.payload };
    default:
      return state;
  }
};
```

✅ Reducers must:

* Be **pure** (no API calls or random behavior).
* Never mutate state directly — always **return a new copy**.

---

### 🧠 d) **Dispatch**

`store.dispatch(action)` sends an action to the store.

```js
store.dispatch({ type: 'INCREMENT', payload: 1 });
```

✅ It triggers the reducer to calculate the **new state**.

---

### 👀 e) **Subscribe**

Components subscribe to listen to state changes.

```js
store.subscribe(() => {
  console.log(store.getState());
});
```

---

## ⚙️ 4. How Redux Stores Data (Internals)

Redux internally stores data as a **JavaScript object**.

Example:

```js
{
  user: { name: "Zameer", loggedIn: true },
  cart: { items: [1, 2, 3] },
  theme: { darkMode: false }
}
```

* Each **slice** (user, cart, theme) is managed by its own **reducer**.
* Combined using `combineReducers()`:

  ```js
  import { combineReducers } from 'redux';
  const rootReducer = combineReducers({ userReducer, cartReducer, themeReducer });
  ```

✅ The store always holds the **entire state tree** of the app.

---

## ⚙️ 5. Middleware in Redux

### 🔹 What is Middleware?

Middleware sits **between dispatching an action and reaching the reducer**.
It’s used for handling **side effects** like API calls, logging, authentication, etc.

### Common Middlewares:

* **redux-thunk** → allows async actions (API calls)
* **redux-saga** → generator-based async handling
* **redux-logger** → logs every action in console

---

### 🧩 Example with Thunk:

```js
// actions.js
export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_USERS_REQUEST" });
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_USERS_FAILURE", payload: error });
    }
  };
};
```

✅ `redux-thunk` lets you dispatch **functions** instead of plain objects.

---

## 🧱 6. Calling APIs in Redux

Redux by itself is **synchronous** — it cannot directly call APIs.
That’s why we use middleware like **redux-thunk**.

**Flow of an API call:**

```
Component → dispatch(fetchUsers())
→ Thunk makes async call
→ Dispatch success/failure action
→ Reducer updates state
→ UI re-renders
```

---

## ⚖️ 7. Redux Store vs React Reducer

| Feature           | React `useReducer`                     | Redux                             |
| ----------------- | -------------------------------------- | --------------------------------- |
| **Scope**         | Local (single component or small area) | Global (whole app)                |
| **State Storage** | Stored in component memory             | Centralized store                 |
| **Middleware**    | Not supported                          | Supports middleware (Thunk, Saga) |
| **Async Logic**   | Handle manually inside component       | Handled via middleware            |
| **DevTools**      | No built-in logging                    | Powerful Redux DevTools           |
| **Setup**         | Simple, minimal code                   | More boilerplate                  |
| **Performance**   | Great for small apps                   | Better for large-scale apps       |

✅ **React Reducer** → for local state (e.g., form input, modal).
✅ **Redux** → for global shared data (e.g., auth, user info, cart).

---

## ⚖️ 8. Pros and Cons of Redux

### ✅ Pros:

1. **Predictable State Management** — unidirectional, centralized.
2. **Easy Debugging** — every change is logged.
3. **Scalable** — works great for large, complex applications.
4. **Middleware** — allows async logic and side effects.
5. **DevTools Integration** — time-travel debugging.

### ❌ Cons:

1. **Boilerplate Code** — too many files/actions/reducers.
2. **Steep Learning Curve** — for beginners.
3. **Overkill for small apps** — might use Context or Zustand instead.
4. **Immutability required** — improper updates cause bugs.

---

## ⚙️ 9. Modern Redux (Redux Toolkit)

Redux Toolkit (RTK) solves most of Redux’s problems:

* Less boilerplate.
* Built-in Thunk.
* Built-in Immer (for immutability).
* Cleaner syntax.

Example:

```js
import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { state.count += 1; },
    decrement: (state) => { state.count -= 1; }
  },
});

export const { increment, decrement } = counterSlice.actions;

const store = configureStore({ reducer: counterSlice.reducer });
export default store;
```

✅ No need to manually write reducers, switch cases, or action types.

---

## 🧭 10. Summary Map

| Concept           | Description              | Example                              |
| ----------------- | ------------------------ | ------------------------------------ |
| **Store**         | Holds global state       | `createStore()` / `configureStore()` |
| **Action**        | Describes what happened  | `{ type: 'INCREMENT' }`              |
| **Reducer**       | Updates state            | `(state, action) => newState`        |
| **Dispatch**      | Sends action to reducer  | `dispatch({ type: 'ADD' })`          |
| **Middleware**    | Handles side effects     | Thunk, Saga                          |
| **Async Call**    | Performed via middleware | `dispatch(fetchData())`              |
| **React Reducer** | Local useReducer         | Component-level state                |
| **Redux**         | App-level state          | Global store                         |

---












































---

# 🧠 REDUX — ADVANCED CONCEPTS (Complete Breakdown)

---

## 🏗️ 1. Store

The **store** is the single object that holds the **entire state tree** of your application.
It is created using `createStore()` (Redux) or `configureStore()` (Redux Toolkit).

### ✅ Methods of Store:

1. **`dispatch(action)`** — Sends an action to update the state.
2. **`subscribe(listener)`** — Listens to store updates.
3. **`unsubscribe()`** — Stops listening to updates.
4. **`getState()`** — Returns the current state.
5. **`replaceReducer(newReducer)`** — Dynamically replaces reducer (used in code splitting).
6. **`enhancer`** — Extends store capabilities (e.g., middleware, DevTools).

---

### Example:

```js
import { createStore } from 'redux';

const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INC':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const store = createStore(counterReducer);

// Subscribe
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch
store.dispatch({ type: 'INC' });

// Unsubscribe
unsubscribe();
```

---

## ⚡ 2. Dispatch

`dispatch(action)` sends an **action** to the **store**.
This triggers the **reducer**, which calculates the **new state**.

```js
store.dispatch({ type: 'INCREMENT' });
```

Internally:

* Redux checks current state.
* Calls reducer with `(state, action)`.
* Updates the store with new state.
* Notifies all subscribers (React components).

---

## 🔄 3. Subscribe / Unsubscribe

* **`subscribe()`** registers a callback that runs whenever the state changes.
* **`unsubscribe()`** stops that listener.

```js
const unsubscribe = store.subscribe(() => {
  console.log('State changed:', store.getState());
});

unsubscribe(); // stop listening
```

---

## 🧩 4. getState

* Used to **read the current state** of the Redux store.

```js
const currentState = store.getState();
console.log(currentState);
```

---

## ⚙️ 5. replaceReducer

Used in **code splitting** or **hot reloading**, where you want to replace the reducer dynamically.

```js
store.replaceReducer(newReducer);
```

Example use case:

* If a new feature is lazy-loaded, you can inject its reducer dynamically.

---

## 🔧 6. Store Enhancer

A **higher-order function** that extends the store’s capability — e.g., middleware, logging, devtools.

Created using `applyMiddleware()` or libraries like `composeWithDevTools()`.

Example:

```js
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

const store = createStore(reducer, applyMiddleware(logger));
```

---

## ⚡ 7. Action

An **action** is a plain JavaScript object describing *what happened*.

### Structure:

```js
{
  type: 'ADD_TODO',
  payload: { text: 'Learn Redux' }
}
```

Rules:

* Must have a `type` field.
* Should be serializable.
* Must be **pure data**, no functions or promises.

---

## 🧠 8. Action Creator

A **function** that returns an action.

```js
const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: text
});
```

✅ Benefits:

* Cleaner code.
* Easier testing.
* Reusable in async flows (like Thunk).

---

## 🔁 9. Reducer

A **pure function** that takes `(state, action)` → returns **new state**.

Rules:

1. Must be pure — no side effects (API, random, etc.).
2. Must return new state, not mutate.
3. Must handle unknown actions by returning current state.

Example:

```js
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INC':
      return { count: state.count + 1 };
    case 'DEC':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

---

## 🔄 10. Redux Data Flow (One-way)

```
UI → dispatch(action)
    ↓
Reducer updates state
    ↓
Store notifies subscribers
    ↓
UI re-renders
```

---

## 🧭 11. Redux Principles

1. **Single Source of Truth** → One centralized store for all data.
2. **State is Read-Only** → Can only change via dispatching actions.
3. **Changes are made with Pure Functions** → Reducers.

---

## 🧩 12. Selectors

Selectors are **functions** used to read specific data from the store.

Example:

```js
export const selectUser = (state) => state.user;
```

✅ Benefits:

* Avoids code duplication.
* Improves readability.
* Easier testing.

---

### 🧠 Memoized Selector (using Reselect)

Prevents re-computation when state doesn’t change.

```js
import { createSelector } from 'reselect';

const selectTodos = (state) => state.todos;
const selectCompleted = createSelector(
  [selectTodos],
  (todos) => todos.filter(todo => todo.completed)
);
```

✅ Only re-runs if `todos` changes.

---

## ⚙️ 13. Middleware

Middleware allows **custom logic** to run **between dispatch and reducer**.

Example flow:

```
Dispatch(action)
   ↓
Middleware (logger, async, analytics)
   ↓
Reducer
   ↓
New state → UI
```

### Common Middleware:

* **Logger** → logs every action and state.
* **Crash Reporter** → catches and logs errors.
* **Thunk / Saga** → handle async code.

Example:

```js
const logger = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next State:', store.getState());
  return result;
};
```

Apply it:

```js
const store = createStore(rootReducer, applyMiddleware(logger));
```

---

## ⚙️ 14. Redux Thunk

Thunk is a **middleware** that allows **dispatching functions instead of plain actions** — used for async logic.

Example:

```js
export const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err });
    }
  };
};
```

---

## 🔁 15. Thunk vs Saga

| Feature          | Redux Thunk             | Redux Saga                            |
| ---------------- | ----------------------- | ------------------------------------- |
| **Type**         | Middleware              | Middleware                            |
| **Syntax**       | Async functions         | Generator functions                   |
| **Complexity**   | Simple                  | More powerful, complex                |
| **Use case**     | Basic API calls         | Complex async flows                   |
| **Side effects** | Inside thunk            | Handled externally via saga           |
| **Example**      | `dispatch(fetchData())` | `yield takeEvery('FETCH', fetchSaga)` |

---

## ⚡ 16. Payload Creator (RTK)

In Redux Toolkit, you can define **action payloads** easily.

```js
const addUser = createAction('user/add', (name) => ({
  payload: {
    id: nanoid(),
    name
  }
}));
```

✅ Generates both type and payload in one go.

---

## 🧰 17. Adding Multiple Middleware

You can pass multiple middleware into `applyMiddleware()`:

```js
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger, crashReporter)
);
```

Or in Redux Toolkit:

```js
configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, crashReporter),
});
```

---

## 🧩 18. Slice (Redux Toolkit)

**Slice** = combination of state + reducers + actions.

```js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { state.count++; },
    decrement: (state) => { state.count--; },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

---

## ⚙️ 19. extraReducers (Handling Async)

Used to handle **async actions** (from thunks or other slices).

```js
extraReducers: (builder) => {
  builder
    .addCase(fetchUser.pending, (state) => { state.loading = true; })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(fetchUser.rejected, (state) => { state.error = true; });
}
```

---

## ⚡ 20. Nanoid

Used to generate unique IDs (built into Redux Toolkit).

```js
import { nanoid } from '@reduxjs/toolkit';

const id = nanoid(); // 'V1StGXR8_Z5jdHi6B-myT'
```

---

## 🌐 21. Redux Query (RTK Query)

A **data fetching & caching library** built into Redux Toolkit.

### Benefits:

* Eliminates manual API calls.
* Auto caching and invalidation.
* Handles loading/error states automatically.

### Example:

```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users'
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
```

Usage:

```jsx
function Users() {
  const { data, error, isLoading } = useGetUsersQuery();
  if (isLoading) return <p>Loading...</p>;
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

✅ It’s like combining Redux + Axios + Caching into one.

---

## 🧩 22. Redux Toolkit vs Classic Redux

| Feature        | Classic Redux  | Redux Toolkit             |
| -------------- | -------------- | ------------------------- |
| Boilerplate    | High           | Low                       |
| Immutability   | Manual         | Automatic (Immer)         |
| Middleware     | Manual setup   | Built-in                  |
| Async logic    | Thunk external | Built-in createAsyncThunk |
| Actions        | Manual types   | Auto-generated            |
| Code splitting | Manual         | Built-in slice structure  |

---

## 🧭 23. Summary (Concept Map)

| Concept            | Purpose                     |
| ------------------ | --------------------------- |
| **Store**          | Holds global state          |
| **Action**         | Describes what to do        |
| **Reducer**        | Updates state               |
| **Dispatch**       | Sends action                |
| **Middleware**     | Handles side effects        |
| **Selector**       | Reads specific state        |
| **Thunk**          | Handles async calls         |
| **Slice**          | Combines reducers & actions |
| **RTK Query**      | API + caching               |
| **Enhancer**       | Extends store               |
| **replaceReducer** | Dynamic injection           |
| **nanoid**         | Generates unique IDs        |

---


























---

## 🧠 **1. Normalizing Data**

When your app grows, data becomes **nested** (e.g., user → posts → comments).
That causes **duplicate data**, hard updates, and unnecessary re-renders.

### ❌ Example of non-normalized state:

```js
{
  users: [
    {
      id: 1,
      name: "Alice",
      posts: [
        { id: 101, title: "Post A" },
        { id: 102, title: "Post B" }
      ]
    }
  ]
}
```

If post `101` updates, you must update it in multiple places — messy!

### ✅ Normalized state

We **flatten** data like a database:

```js
{
  users: { 
    1: { id: 1, name: "Alice", posts: [101, 102] }
  },
  posts: { 
    101: { id: 101, title: "Post A" },
    102: { id: 102, title: "Post B" }
  }
}
```

Now every entity (user, post) is stored once, updates are easy, and selectors stay efficient.

---

## 📦 **2. Normalized State**

Normalized state means:

* Each entity type (user, post, comment) has its own lookup table (like a database table).
* Each item can be referenced by ID (like foreign keys).
* Helps **avoid redundant re-renders**, since only affected entities are updated.

Redux Toolkit offers utilities like **`createEntityAdapter()`** for this.

---

## ⚙️ **3. createEntityAdapter**

`createEntityAdapter()` simplifies managing normalized state in Redux Toolkit.

It automatically handles:

* CRUD operations
* Sorting
* Entity lookups

### Example:

```js
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    addUser: usersAdapter.addOne,
    addManyUsers: usersAdapter.addMany,
    updateUser: usersAdapter.updateOne,
    removeUser: usersAdapter.removeOne
  }
});

export const userSelectors = usersAdapter.getSelectors((state) => state.users);
```

✅ Benefits:

* Fast lookups
* Consistent structure
* Built-in selectors (`selectById`, `selectAll`, etc.)

---

## ⚖️ **4. shallowEqual & Reference Equality**

React re-renders if **object references** change, not if the values are equal.

### Reference Equality:

```js
const a = { name: "A" };
const b = { name: "A" };

console.log(a === b); // false -> different reference
```

Even though values are same, React thinks the object changed → causes re-render.

### shallowEqual:

Redux provides `shallowEqual` to compare only the **first-level properties**.

Used in:

```js
import { useSelector, shallowEqual } from "react-redux";

const user = useSelector((state) => state.user, shallowEqual);
```

✅ Prevents unnecessary re-renders when object reference changes but values don’t.

---

## 🔁 **5. Serializing**

Redux state must be **serializable** — meaning it can be safely stored as JSON.

❌ Avoid non-serializable values:

* Promises
* Class instances
* DOM nodes
* Functions

✅ Do store:

* Objects
* Arrays
* Strings
* Numbers
* Booleans

Redux Toolkit’s middleware checks for non-serializable values and warns you.

---

## 💧 **6. Hydrating**

Hydration = **restoring Redux state from storage or server**.

### Example:

When user refreshes page, you want to keep them logged in.
You can rehydrate from `localStorage`:

```js
const persistedState = JSON.parse(localStorage.getItem("appState"));

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState
});
```

Or from server-side rendering (SSR) — the server sends initial Redux state to client.

---

## 🔄 **7. Redux vs Flux**

Redux was inspired by Facebook’s **Flux** architecture.

| Feature        | Flux               | Redux                           |
| -------------- | ------------------ | ------------------------------- |
| Stores         | Multiple           | Single (one global store)       |
| State Mutation | Mutable            | Immutable                       |
| Dispatcher     | Central dispatcher | No dispatcher (reducer pattern) |
| Data Flow      | One-way            | One-way                         |
| Debugging      | Harder             | Easier (Redux DevTools)         |

✅ Redux simplified Flux by:

* Using pure functions (reducers)
* Making state immutable
* Centralizing state in one store

---

## ⚡ **8. Saga vs Thunk**

### **Redux Thunk**

* Middleware to handle async logic inside actions.
* Action creators return a **function** instead of an object.
* Great for simple async operations (e.g., fetching data).

```js
const fetchUsers = () => async (dispatch) => {
  const res = await fetch("/users");
  const data = await res.json();
  dispatch({ type: "users/loaded", payload: data });
};
```

🟢 **Pros:**

* Simple to use
* Perfect for small/medium apps

🔴 **Cons:**

* Harder to test for complex async flows
* Not great for multiple dependent async actions

---

### **Redux Saga**

* Uses **generator functions (`function*`)** for complex async logic.
* Actions trigger sagas, sagas perform side effects (API calls), and then dispatch new actions.

```js
function* fetchUsersSaga() {
  const users = yield call(fetchUsersAPI);
  yield put({ type: "users/loaded", payload: users });
}
```

🟢 **Pros:**

* Declarative async control flow
* Easier to handle retries, cancellations, sequencing
* Better for large apps with complex side effects

🔴 **Cons:**

* Slightly harder to learn
* Boilerplate setup

✅ **Thunk vs Saga Summary:**

| Feature    | Thunk              | Saga                |
| ---------- | ------------------ | ------------------- |
| Style      | Imperative         | Declarative         |
| API Calls  | Simple async/await | Generator functions |
| Complexity | Low                | High                |
| Best for   | Small apps         | Large scale apps    |

---

### 🔚 Summary Overview

| Concept                 | Purpose                                       |
| ----------------------- | --------------------------------------------- |
| **Normalizing Data**    | Flatten nested data for easy updates          |
| **createEntityAdapter** | Simplify CRUD operations for normalized state |
| **shallowEqual**        | Prevent unnecessary re-renders                |
| **Serializing**         | Keep state JSON-safe                          |
| **Hydrating**           | Restore Redux state from storage/server       |
| **Redux vs Flux**       | Simplifies unidirectional flow                |
| **Thunk vs Saga**       | Async control: simple vs complex              |

---



























---

## 🧊 1. **Immer – and How It Works in Redux**

### 🔹 The Problem

Redux requires **immutability** — you must never mutate the state directly inside reducers:

```js
// ❌ Wrong:
state.value = 5;
```

Instead, you must always return a **new object**:

```js
// ✅ Correct:
return { ...state, value: 5 };
```

Doing this manually can become messy when the state is deeply nested.

---

### 🔹 The Solution → **Immer**

Immer is a small library (bundled in Redux Toolkit) that lets you **write mutable-looking code** that actually performs immutable updates behind the scenes.

It works by using the **Proxy API**:

* You “mutate” a **draft state**
* Immer **records the changes**
* It **produces a new immutable state**

---

### 🧠 Example

#### ✅ With Immer (in Redux Toolkit)

```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      // Looks like mutation
      state.value += 1;
      // But Immer creates a new immutable state under the hood
    },
  },
});
```

#### 🔍 Without Immer (Vanilla Redux)

```js
function reducer(state = { value: 0 }, action) {
  switch (action.type) {
    case "increment":
      return { ...state, value: state.value + 1 }; // manual copy
    default:
      return state;
  }
}
```

✅ **Benefit:** Cleaner syntax, no deep cloning, and safer immutable updates.

---

## 🏪 2. **Accessing the Store Outside React Components**

Sometimes you need to use the Redux store in non-React files, e.g.:

* Inside utility functions
* In middleware
* For logging or custom event handlers

### 🔹 Example

```js
// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({ reducer: counterReducer });
```

Now you can import it anywhere:

```js
// api.js
import { store } from "./store";

const currentState = store.getState();
console.log("Current Redux State:", currentState);

store.dispatch({ type: "counter/increment" });
```

✅ Be cautious — direct store access should be **rare**. Prefer `useSelector`/`useDispatch` in React components for reactivity.

---

## ⚡ 3. **Flux by Facebook (the origin of Redux)**

Before Redux, Facebook created **Flux**, a pattern for **unidirectional data flow**.

### 🔁 Data Flow in Flux

1. **Action** → triggered by user or server event
2. **Dispatcher** → central hub sends the action to all stores
3. **Store** → updates internal state and emits a change
4. **View (React Component)** → listens to store change and re-renders

### 🔹 Redux Simplified Flux

| Concept       | Flux     | Redux                         |
| ------------- | -------- | ----------------------------- |
| Dispatcher    | Required | Removed (Reducers replace it) |
| Stores        | Multiple | Single store                  |
| State updates | Mutable  | Immutable                     |
| Simplicity    | Complex  | Cleaner with pure functions   |

Redux essentially **made Flux easier and predictable**.

---

## 📊 4. **LogRocket**

LogRocket is a **session replay & Redux state monitoring tool**.

### 🧠 What it does:

* Records user actions and UI interactions
* Captures Redux state + actions history
* Helps debug bugs and crashes visually

### 🔹 Example setup:

```bash
npm install logrocket
```

```js
import LogRocket from "logrocket";
LogRocket.init("your-org/your-app");

// Optional: integrate Redux store
import { createLogger } from "redux-logger";
```

✅ **Use case:**
Debugging real-world production Redux apps with live replay and state inspection.

---

## 🚀 5. **createAsyncThunk**

`createAsyncThunk` simplifies **async logic** in Redux Toolkit.

### 🔹 Why use it?

Instead of writing thunks manually with try/catch, RTK automates pending, fulfilled, and rejected states.

### 🧠 Example:

```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Step 1: Define async thunk
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    const res = await fetch("/api/users");
    if (!res.ok) return thunkAPI.rejectWithValue("Error fetching users");
    return res.json();
  }
);

// Step 2: Handle states in slice
const usersSlice = createSlice({
  name: "users",
  initialState: { data: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
```

✅ Handles **lifecycle automatically** — `pending`, `fulfilled`, and `rejected`.

---

## 🧩 6. **createEntityAdapter**

Already covered briefly before — but here’s how it ties with async thunks:

```js
import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const res = await fetch("/api/users");
  return res.json();
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
  },
});
```

✅ Automatically normalizes data and exposes prebuilt selectors.

---

## 🧮 7. **createSelector (Memoized Selector)**

`createSelector` (from `reselect` library) is used to **optimize derived data** in Redux.

Without memoization, every re-render recomputes derived data.

### Example:

```js
import { createSelector } from "@reduxjs/toolkit";

const selectUsers = (state) => state.users.entities;

const selectActiveUsers = createSelector(
  [selectUsers],
  (users) => Object.values(users).filter((user) => user.active)
);
```

✅ Only recalculates when `state.users` changes — improving performance.

---

## 🎧 8. **createListenerMiddleware**

`createListenerMiddleware` lets you **react to specific Redux actions** — without writing extra thunks or reducers.

Perfect for:

* Logging
* Chaining actions
* Performing side effects when an action dispatches

### Example:

```js
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchUsers } from "./userSlice";

const listenerMiddleware = createListenerMiddleware();

// Run when fetchUsers.fulfilled is dispatched
listenerMiddleware.startListening({
  actionCreator: fetchUsers.fulfilled,
  effect: async (action, listenerApi) => {
    console.log("Users loaded:", action.payload);
    listenerApi.dispatch({ type: "log/add", payload: "User data fetched" });
  },
});
```

Then add it to the store:

```js
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault().prepend(listenerMiddleware.middleware),
});
```

✅ Works like an **event listener** for Redux — no need to modify existing reducers.

---

## 🧾 Summary Table

| Concept                             | Purpose                       | Key Benefit                               |
| ----------------------------------- | ----------------------------- | ----------------------------------------- |
| **Immer**                           | Proxy-based immutable updates | Cleaner reducer syntax                    |
| **Access store outside components** | Use store globally            | For logging or utilities                  |
| **Flux**                            | Facebook’s original pattern   | Foundation for Redux                      |
| **LogRocket**                       | Redux state + UI debugger     | Replay user sessions                      |
| **createAsyncThunk**                | Async API calls               | Auto handles pending, fulfilled, rejected |
| **createEntityAdapter**             | Normalized CRUD management    | Efficient data structure                  |
| **createSelector**                  | Memoized derived data         | Prevent unnecessary recomputes            |
| **createListenerMiddleware**        | Action-based side effects     | Listen to actions reactively              |

---

































---

## 🔐 **1. What is JWT (JSON Web Token)?**

**JWT (JSON Web Token)** is a **compact, URL-safe token** used for securely transmitting information between two parties — typically between a **client (browser/app)** and a **server**.

* It is **digitally signed**, not encrypted by default.
* It is used mainly for **authentication** and **authorization**.
* The signature ensures that the token has **not been tampered with**.

✅ **In short:**
JWT = A self-contained proof of identity.

---

## 🧱 **2. Structure of JWT**

A JWT is made of **three base64-encoded parts**, separated by dots:

```
xxxxx.yyyyy.zzzzz
```

### 🧩 Breakdown:

| Part          | Meaning                                  | Example                                                                        |
| ------------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| **Header**    | Contains token metadata & algorithm info | `{ "alg": "HS256", "typ": "JWT" }`                                             |
| **Payload**   | Contains user data (claims)              | `{ "id": 123, "email": "user@gmail.com", "role": "admin", "exp": 1728672321 }` |
| **Signature** | Verifies the integrity of the token      | HMACSHA256(base64(header) + "." + base64(payload), secret)                     |

So, the token looks like:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSJ9.
AJ5tsoZZ6bZJQhM9vYbpOQ1ycM1uVZZ-7kRfJP4z0Uo
```

---

## 🧾 **3. JWT Header**

* Specifies the **type of token** and **algorithm** used for signing.

Example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

* **alg** → Hashing algorithm (HMAC SHA256 or RSA)
* **typ** → Token type (always "JWT")

---

## 📦 **4. JWT Payload (Claims)**

Contains the **actual data** being sent, such as:

* `id` → User ID
* `email` → Email
* `role` → User role (admin, user, etc.)
* `iat` → Issued At timestamp
* `exp` → Expiration timestamp

Example:

```json
{
  "id": 42,
  "email": "john@example.com",
  "role": "admin",
  "iat": 1728572321,
  "exp": 1728575921
}
```

---

## ⏰ **5. iat and exp (or eat)**

| Field                | Meaning                                                            |
| -------------------- | ------------------------------------------------------------------ |
| **iat (Issued At)**  | Time (in seconds since epoch) when token was generated             |
| **exp (Expiration)** | Time when token will expire                                        |
| **eat**              | Typo — probably you meant `exp` (some libraries may abbreviate it) |

Example:

```js
{
  "iat": 1728572321,
  "exp": 1728575921
}
```

→ The server uses these to automatically reject expired tokens.

---

## ✍️ **6. Signature**

Used to **verify the token’s authenticity**.

```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

* Only the **server knows the secret key**, so the client cannot forge a valid token.
* If the token is changed (even 1 character), the signature fails to match.

---

## 🔁 **7. How JWT Authentication Works**

Let’s go through the flow:

### 🧩 Step-by-step process:

1. **User Login:**
   Client sends username/password → server verifies.

2. **Token Creation:**
   Server generates a **JWT** (signed with secret key) containing user info.

3. **Token Sent to Client:**
   The token is sent back (usually in response body or cookie).

4. **Client Stores Token:**
   Client stores it in **localStorage** or **HTTP-only cookies**.

5. **Authenticated Requests:**
   On each request, the client includes the token in the **Authorization header**:

   ```
   Authorization: Bearer <token>
   ```

6. **Server Verifies Token:**

   * Decodes the token using the secret.
   * Checks **signature** + **expiry (exp)**.
   * Grants access if valid.

7. **Access Granted:**
   The protected route is served; otherwise, a 401 Unauthorized error is returned.

---

## 🧠 **8. Pros and Cons of JWT**

| ✅ Pros                                         | ❌ Cons                                          |
| ---------------------------------------------- | ----------------------------------------------- |
| Stateless (no session storage needed)          | Can’t easily revoke tokens once issued          |
| Fast verification                              | Bigger payload = heavier HTTP headers           |
| Portable (works across microservices, domains) | If secret is leaked → entire system compromised |
| Can store extra claims                         | Must handle refresh token logic manually        |

---

## ⏳ **9. Expiration Time**

* JWTs **should always have an expiry (`exp`)**.
* Prevents long-term misuse if stolen.

Typical lifetimes:

* Access token: **15 min – 1 hour**
* Refresh token: **7 days – 30 days**

Example:

```js
jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
```

---

## 🪪 **10. Bearer Token**

Bearer = “holder of this token is trusted.”
Used in HTTP headers to send JWTs:

```
Authorization: Bearer <JWT>
```

* If someone steals your token, they can act as you (that’s why secure storage is crucial).

---

## 🧨 **11. Token Revocation**

Because JWTs are stateless, they **cannot be “deleted”** once issued.

### Ways to handle revocation:

1. **Blacklist:** Maintain a DB of revoked tokens.
2. **Short expiry:** Make access tokens expire quickly.
3. **Rotate tokens:** Issue new ones frequently.
4. **Use refresh tokens:** Re-authenticate silently when access token expires.

---

## 🔁 **12. Refresh Token**

* A **long-lived token** that issues **new short-lived access tokens**.
* Stored securely (e.g., HTTP-only cookie).
* Used when access token expires.

### Example Flow:

1. Login → Server sends **access + refresh** tokens.
2. Access token expires → client sends refresh token.
3. Server validates refresh token and issues new access token.

✅ Keeps the user logged in without re-entering credentials.

---

## 🧍‍♂️ **13. Authentication vs Authorization**

| Term               | Meaning                        | Example                             |
| ------------------ | ------------------------------ | ----------------------------------- |
| **Authentication** | Verifying who the user is      | Login with email/password           |
| **Authorization**  | Verifying what they can access | Admin can delete users, user cannot |

JWT often handles both — identity (authn) and permissions (authz).

---

## 🏷️ **14. Types of JWT Claims**

Claims = information inside the payload.

### 1. **Registered Claims**

Predefined keys recognized by JWT standards (RFC 7519):

* `iss` – Issuer
* `sub` – Subject (user ID)
* `aud` – Audience (intended recipient)
* `exp` – Expiration time
* `nbf` – Not before
* `iat` – Issued at
* `jti` – JWT ID (unique token ID)

---

### 2. **Public Claims**

* Custom claims you define that are **shared publicly**.
* Should be registered in the **IANA JSON Web Token registry** to avoid name conflicts.

```json
{ "name": "John", "email": "john@example.com" }
```

---

### 3. **Private Claims**

* Application-specific custom claims shared **only between parties**.
* Not registered publicly.

```json
{ "role": "admin", "department": "finance" }
```

---

## 🧾 **15. Example JWT End-to-End**

### **Backend (Node.js + Express)**

```js
import jwt from "jsonwebtoken";

const SECRET_KEY = "mysecret";

app.post("/login", (req, res) => {
  const user = { id: 1, email: "user@gmail.com" };
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

app.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: "Welcome", user: decoded });
  } catch {
    res.status(401).send("Invalid or expired token");
  }
});
```

---

## 🧩 **Summary Table**

| Concept            | Description                             |
| ------------------ | --------------------------------------- |
| **JWT**            | Compact signed token for authentication |
| **Structure**      | Header.Payload.Signature                |
| **iat / exp**      | Issue & Expiration times                |
| **Signature**      | Ensures integrity (not tampering)       |
| **Bearer Token**   | Auth header with JWT                    |
| **Refresh Token**  | Renews access token silently            |
| **Revocation**     | Handled via blacklist or short expiry   |
| **Authentication** | Identity verification                   |
| **Authorization**  | Permission verification                 |
| **Claims Types**   | Registered, Public, Private             |

---



