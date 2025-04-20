## Namaste React Course by Akshay Saini

# Episode 08 - Let's get Classy

### ✅ **Class-Based Component Definition (React)**

> A class-based component is a **React component defined using ES6 classes**, that extends `React.Component` and has a `render()` method which returns JSX.

---

### 🧩 Basic Example:

```jsx
import React, { Component } from 'react';

class MyComponent extends Component {
  render() {
    return <h1>Hello from Class Component</h1>;
  }
}
```

Class components can use **state**, **lifecycle methods** (`componentDidMount`, `componentDidUpdate`, etc.), and **props**. They're the older way before hooks were introduced in functional components. Want a comparison with functional components too?

## Q: What is the order of life cycle method calls in `Class Based Components`?

A: Following is the order of lifecycle methods calls in `Class Based Components`:

1. constructor()
2. render ()
3. componentDidMount()
4. componentDidUpdate()
5. componentWillUnmount()

For more reference [React-Lifecycle-methods-Diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## Q: Why do we use `componentDidMount`?

A: The `componentDidMount()` method allows us to execute the React code when the component is already placed in the DOM (Document Object Model). This method is called during the Mounting phase of the React Life-cycle i.e after the component is rendered.
Wwe can run any piece of react code to modify the components. For ex. It's the best place to `make API calls`.

## Q: Why do we use `componentWillUnmount`? Show with example.

A: `componentWillUnmount()` is useful for the cleanup of the application when we switch routes from one place to another. Since we are working with a SPA(Single Page Application) the component process always runs in the background even if we switch to another route. So it is required to stop those processes before leaving the page. If we revisit the same page, a new process starts that affects the browser performance.
For example, in Repo class, during `componentDidMount()` a timer is set with an interval of every one second to print in console. When the component is unmounted (users moves to a different page), the timer will be running in the background, which we might not even realize and causing huge performance issue. To avoid such situations the cleanup function can be done in componentWillUnmount, in this example `clearInterval`(timer) to clear the timer interval before unmounting Repo component.

## Q: (Research) Why do we use `super(props)` in constructor?

A: `super(props)` is used to inherit the properties and access of variables of the React parent class when we initialize our component.
super() is used inside constructor of a class to derive the parent's all properties inside the class that extended it. If super() is not used, then Reference Error : Must call super constructor in derived classes before accessing 'this' or returning from derived constructor is thrown in the console.
The main difference between super() and super(props) is the this.props is undefined in child's constructor in super() but this.props contains the passed props if super(props) is used.

## Q: (Research) Why can't we have the `callback function` of `useEffect async`?

A: `useEffect` expects it's callback function to return nothing or return a function (cleanup function that is called when the component is unmounted). If we make the callback function as `async`, it will return a `promise` and the promise will affect the clean-up function from being called.



Great question!

### 🧯 What does **"unmount"** mean in React?

**Unmount** refers to the moment when a component is **removed from the DOM** — basically, it's no longer visible or active in your app.

---

### 💡 Examples of Unmounting:

1. **Switching routes**:
   ```jsx
   <Route path="/home" component={Home} />
   <Route path="/about" component={About} />
   ```
   When you go from `/home` to `/about`, the `Home` component **unmounts**, and `About` mounts.

2. **Conditional rendering**:
   ```jsx
   {showProfile && <Profile />}
   ```
   If `showProfile` changes from `true` to `false`, the `Profile` component is **unmounted**.

---

### 🔁 Why it matters?

When a component unmounts:
- You should clean up side effects like:
  - intervals (`setInterval`)
  - timeouts (`setTimeout`)
  - subscriptions
  - event listeners

---

### ✅ Example:
```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => {
    clearInterval(id); // cleanup when component unmounts
  };
}, []);
```
Awesome follow-up!

### 🔄 Does a component **unmount** if it re-renders?

**Nope.** A **re-render** is **not** an unmount.

---

### 🧠 Here's the difference:

| Action        | What Happens                                |
|---------------|---------------------------------------------|
| **Re-render** | React updates the component's UI with new props/state. Component **stays mounted**. |
| **Unmount**   | React removes the component from the DOM.   |

---

### ✅ Example:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Mounted or re-rendered");

    return () => {
      console.log("Cleanup"); // ONLY runs when unmounted, not on re-render
    };
  }, []);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

- `console.log("Mounted or re-rendered")` runs **only once** because of the empty dependency array.
- `console.log("Cleanup")` only runs when the component is **unmounted**, not on every button click.

---

If you change the dependencies in `useEffect`, cleanup happens **before the effect runs again**, but that's still not a full unmount — it’s called **effect cleanup**, not component unmount.

Want to go deeper into this or see a visual example?



Great question! Understanding the **Render Phase** and **Commit Phase** in a **React Class Component lifecycle** helps you grasp what's happening under the hood when your component mounts, updates, or unmounts.

---

## 🌀 React Class Component Lifecycle Phases

React’s rendering process is split into **two main phases**:

### 1️⃣ **Render Phase**
- **What happens?**
  - React **calls the render method** of the component.
  - Calculates the **new virtual DOM** (no actual DOM changes yet).
  - It's **pure** — no side effects allowed here (e.g., no network requests, no DOM manipulation).

- **Methods called:**
  - `constructor()` – once (initial setup)
  - `static getDerivedStateFromProps()` – rarely used
  - `render()` – builds virtual DOM
  - `shouldComponentUpdate()` – lets you optimize unnecessary re-renders

---

### 2️⃣ **Commit Phase**
- **What happens?**
  - React **commits changes** to the actual DOM.
  - Side effects are allowed here.
  - Safe to interact with DOM, do network requests, start timers, etc.

- **Methods called:**
  - `componentDidMount()` – runs after first render (mount)
  - `componentDidUpdate()` – runs after each update (state/props change)
  - `componentWillUnmount()` – runs before component is removed from DOM

---

## 🔁 Lifecycle Flow Example

### When component is **mounting**:

```plaintext
constructor()
⬇
getDerivedStateFromProps()
⬇
render()   ← Render Phase
⬇
componentDidMount() ← Commit Phase
```

### When component is **updating** (due to state/props):

```plaintext
getDerivedStateFromProps()
⬇
shouldComponentUpdate()
⬇
render()   ← Render Phase
⬇
componentDidUpdate() ← Commit Phase
```

### When component is **unmounting**:

```plaintext
componentWillUnmount() ← Commit Phase
```

---

## 🧠 Quick Tips:
- **Use `render()`** to build UI only — don’t fetch or mutate state.
- **Use `componentDidMount()`** to fetch data, start timers, add subscriptions.
- **Use `componentWillUnmount()`** to clean up (e.g., clear timers, remove listeners).

---

Want a visual diagram or to see the same thing in functional components with hooks (`useEffect`)?