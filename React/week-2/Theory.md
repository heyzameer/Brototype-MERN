 In React, there are **several different ways** you can **pass and receive props** depending on how clean or convenient you want your code to be.

---

## ✅ 1. **Basic Props (Standard Way)**

### 👉 Passing:
```jsx
<Greeting name="Zameer" />
```

### 👉 Receiving:
```jsx
const Greeting = (props) => {
  return <h1>Hello {props.name}</h1>;
};
```

---

## ✅ 2. **Destructuring Props Inside the Function Body**

### 👉 Receiving:
```jsx
const Greeting = (props) => {
  const { name } = props;
  return <h1>Hello {name}</h1>;
};
```

---

## ✅ 3. **Destructuring Props in the Function Parameters**

### 👉 Receiving:
```jsx
const Greeting = ({ name }) => {
  return <h1>Hello {name}</h1>;
};
```

---

## ✅ 4. **Passing Multiple Props as an Object**

### 👉 Passing:
```jsx
<Greeting data={{ isLoggedIn: true, user: "Zameer" }} />
```

### 👉 Receiving:
```jsx
const Greeting = ({ data }) => {
  return <h1>{data.isLoggedIn ? `Welcome ${data.user}` : 'Welcome Guest'}</h1>;
};
```

---

## ✅ 5. **Using the Spread Operator to Pass Props**

### 👉 Passing:
```jsx
const userProps = { name: "Zameer", age: 25 };
<Greeting {...userProps} />
```

### 👉 Receiving:
```jsx
const Greeting = ({ name, age }) => {
  return <h1>{name} is {age} years old</h1>;
};
```

---

## ✅ 6. **Children Prop (Passing JSX inside a Component)**

### 👉 Passing:
```jsx
<Greeting>
  <p>This is a child element</p>
</Greeting>
```

### 👉 Receiving:
```jsx
const Greeting = (props) => {
  return (
    <div>
      <h1>Hello</h1>
      {props.children}
    </div>
  );
};
```

Or use destructuring:
```jsx
const Greeting = ({ children }) => <div>{children}</div>;
```

---

## 🔁 Bonus: **Props with Default Values**

```jsx
const Greeting = ({ name = "Guest" }) => {
  return <h1>Hello {name}</h1>;
};
```

---



Nice! Let’s talk about **PropTypes** in React — a super helpful way to **validate props** and catch bugs early. 🔍

---

## ✅ What Are PropTypes?

`PropTypes` allow you to define the **type and shape of props** a component should receive. This helps you:

- Catch bugs during development
- Improve code readability
- Know what a component expects at a glance

---

## 📦 1. **Install PropTypes (if not already)**

```bash
npm install prop-types
```

---

## 🧩 2. **Basic Usage**

### ✅ Passing & Validating Props

```jsx
import PropTypes from 'prop-types';

const Greeting = ({ name, age }) => {
  return (
    <h1>
      Hello {name}, you are {age} years old.
    </h1>
  );
};

Greeting.propTypes = {
  name: PropTypes.string.isRequired,  // must be a string
  age: PropTypes.number,              // can be a number
};
```

---

## 🔘 Common PropTypes

| Type         | Usage                             |
|--------------|-----------------------------------|
| `string`     | `PropTypes.string`                |
| `number`     | `PropTypes.number`                |
| `bool`       | `PropTypes.bool`                  |
| `array`      | `PropTypes.array`                 |
| `object`     | `PropTypes.object`                |
| `func`       | `PropTypes.func`                  |
| `node`       | `PropTypes.node` (anything renderable) |
| `element`    | `PropTypes.element` (React element) |
| `symbol`     | `PropTypes.symbol`                |

---

## 🧱 3. **More Advanced Usage**

### ✅ Array of specific types:
```js
PropTypes.arrayOf(PropTypes.string)
```

### ✅ Object with specific shape:
```js
PropTypes.shape({
  name: PropTypes.string,
  age: PropTypes.number,
})
```

### ✅ One of specific values:
```js
PropTypes.oneOf(['male', 'female', 'other'])
```

### ✅ One of many types:
```js
PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
])
```

---

## 🪫 4. **Default Props**

You can also set fallback/default values:

```js
Greeting.defaultProps = {
  age: 18,
};
```

---

## ✅ Example with Everything

```jsx
import PropTypes from 'prop-types';

const UserCard = ({ user }) => (
  <div>
    <h2>{user.name}</h2>
    <p>Location: {user.location}</p>
  </div>
);

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
  }).isRequired,
};
```

---









Yes! You’re talking about **conditional rendering** — one of the **most powerful features in React**. 🔥 It lets you control what your app displays based on **logic or state**.

Let’s break it down clearly, with real examples.

---

## 💡 What is Conditional Rendering?

Conditional rendering lets you **show, hide, or switch components/UI** based on conditions (e.g. `isLoggedIn`, `user exists`, etc.)

---

## ✅ 1. **Using `if` Statements**
Basic logic in the component body:

```jsx
if (!isLoggedIn) {
  return <LoginPage />;
}

return <Dashboard />;
```

---

## ✅ 2. **Using Ternary Operator (`? :`)**
Used directly in JSX:

```jsx
{isLoggedIn ? <Dashboard /> : <LoginPage />}
```

---

## ✅ 3. **Using Logical AND (`&&`)**
Great for simple true-only checks:

```jsx
{isAdmin && <button>Delete User</button>}
```

---

## ✅ 4. **Using Switch Statements**
For multiple views/states:

```jsx
switch (status) {
  case 'loading':
    return <Loading />;
  case 'error':
    return <Error />;
  default:
    return <MainContent />;
}
```

---

## ✅ 5. **Assign JSX to a Variable**
Keeps return cleaner:

```jsx
let content;

if (isLoggedIn) {
  content = <Dashboard />;
} else {
  content = <LoginPage />;
}

return <div>{content}</div>;
```

---

## ✅ 6. **Inline with Component Props**
Conditional text or styling:

```jsx
<Greeting message={isLoggedIn ? "Welcome!" : "Please login."} />
```

---

### 📌 Real Example
```jsx
const App = () => {
  const isLoggedIn = true;

  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome Back!</h1>
      ) : (
        <h1>Please Sign In</h1>
      )}
    </div>
  );
};
```

---








Sorting an **array of objects** in JavaScript is super useful — whether you're building a user list, product grid, leaderboard, or anything else.

Here’s a complete guide with clear examples 👇

---

## 🧠 Syntax: `.sort()`
```js
array.sort((a, b) => {
  // return -1 if a should come first
  // return 1 if b should come first
  // return 0 if equal
});
```

---

## ✅ 1. **Sort by String (e.g., name)**

```js
const users = [
  { name: "Zameer", age: 25 },
  { name: "Ayesha", age: 22 },
  { name: "Bilal", age: 30 }
];

// Alphabetical A → Z
users.sort((a, b) => a.name.localeCompare(b.name));

// Reverse Z → A
users.sort((a, b) => b.name.localeCompare(a.name));
```

---

## ✅ 2. **Sort by Number (e.g., age)**

```js
// Ascending (youngest first)
users.sort((a, b) => a.age - b.age);

// Descending (oldest first)
users.sort((a, b) => b.age - a.age);
```

---

## ✅ 3. **Sort by Date**

```js
const posts = [
  { title: "Post 1", date: "2023-05-10" },
  { title: "Post 2", date: "2024-01-15" }
];

// Latest first
posts.sort((a, b) => new Date(b.date) - new Date(a.date));
```

---

## ✅ 4. **Sort by Nested Property**

```js
const users = [
  { name: "Ali", address: { city: "Lahore" } },
  { name: "Sara", address: { city: "Karachi" } }
];

users.sort((a, b) => a.address.city.localeCompare(b.address.city));
```

---

## ⚠️ Important Tip
`.sort()` **mutates the original array**. If you want to **preserve the original**, use `.slice()` or spread:

```js
const sortedUsers = [...users].sort((a, b) => a.age - b.age);
```

---

Let me know if you want a small React example (e.g. sorting users on a card list or dropdown filter)!