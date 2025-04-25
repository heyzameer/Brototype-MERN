The **Context API** in React is a way to share values like data or functions between components **without having to explicitly pass props through every level of the component tree** (a process known as **prop drilling**).

---

### 📦 What is Context API?

The Context API provides a way to create **global state** that can be accessed by any component within a React application.

---

### 🧠 Use Case

Use Context API when:
- You need to share data across many components.
- You want to avoid deeply nested props.
- You're managing themes, user authentication, language preferences, or global settings.

---

### ⚙️ How it Works

1. **Create Context**
```jsx
import { createContext } from 'react';

const MyContext = createContext();
```

2. **Provide Context (wrap components)**
```jsx
<MyContext.Provider value={someValue}>
  <MyComponent />
</MyContext.Provider>
```

3. **Consume Context**
- **Using `useContext` Hook (React 16.8+)**
```jsx
import { useContext } from 'react';

const value = useContext(MyContext);
```

- **Using Context Consumer (older way)**
```jsx
<MyContext.Consumer>
  {value => <div>{value}</div>}
</MyContext.Consumer>
```

---

### 🧪 Example

```jsx
// Context.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

```jsx
// App.js
import React from 'react';
import { ThemeProvider } from './Context';
import Home from './Home';

function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
```

```jsx
// Home.js
import React, { useContext } from 'react';
import { ThemeContext } from './Context';

const Home = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <h1>Current theme is {theme}</h1>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
};
```

---

### ✅ Pros

- Avoids prop drilling
- Cleaner and more maintainable code
- Great for global state

### ❌ Cons

- Can become hard to manage if overused
- Re-rendering all consumers on context value change

---









Sure! In React, **lazy loading** lets you load components **only when they're needed**, reducing the initial bundle size and improving performance.

---

### 🐢 Step-by-Step: Lazy Loaded Component with `React.lazy` and `Suspense`

---

### 1. **Create a Component (to lazy load)**

```jsx
// LazyComponent.js
import React from 'react';

const LazyComponent = () => {
  return <h2>This is a lazy loaded component!</h2>;
};

export default LazyComponent;
```

---

### 2. **Lazy Load It in Another File**

```jsx
// App.js or wherever you want to use it
import React, { Suspense, lazy } from 'react';

// Lazy import
const LazyComponent = lazy(() => import('./LazyComponent'));

const App = () => {
  return (
    <div>
      <h1>Welcome</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};

export default App;
```

---

### ⚠️ `Suspense` is required!
- It wraps around your lazy component.
- You **must** provide a fallback UI while it's loading (e.g. a spinner or text).

---

### ✅ Benefits

- Faster initial load
- Breaks large apps into smaller chunks
- Only loads code when needed

---



Nice work using `useReducer`! You're super close, but there’s a small mistake in the button's `onClick` handler.

---

### ❌ Problem:

You're **calling** `dispatch({ type: "INC" })` immediately when the component renders — this means it executes on load, not on button click.

---

### ✅ Fix:

Wrap the `dispatch` call inside an **arrow function** so it only runs on click:

```jsx
<button onClick={() => dispatch({ type: "INC" })}>Increment</button>
```

---

### 💯 Fixed Code:

```jsx
import React, { useReducer } from 'react';

function countReducer(state, action) {
  switch (action.type) {
    case 'INC':
      return { count: state.count + 1 };
    default:
      throw new Error('Unknown action type');
  }
}

const NewComponent = () => {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INC' })}>Increment</button>
    </div>
  );
};

export default NewComponent;
```

---



Alright! `useParams` is a hook from **React Router** that lets you **access dynamic URL parameters** from the current route. It's super useful when you want to load details based on things like product ID, user ID, blog post slug, etc.

---

### 🔧 Setup Example with `useParams`

Let’s say you have a route like:

```
/product/:id
```

---

### 1. **Define the Route**

```jsx
// App.js or wherever you define routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}
```

---

### 2. **Use `useParams` in the Component**

```jsx
// ProductPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Product Page</h2>
      <p>Product ID from URL: {id}</p>
    </div>
  );
};

export default ProductPage;
```

---

### 🧠 What's Happening?
If you go to `/product/42`, the page will render:

```
Product ID from URL: 42
```

---

### ✅ Use Cases

- Detail pages (product, blog post, user)
- Editing existing records
- Fetching data using ID from URL

---
