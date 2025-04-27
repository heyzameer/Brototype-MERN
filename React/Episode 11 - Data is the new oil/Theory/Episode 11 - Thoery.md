## Namaste React Course by Akshay Saini

# Episode 11 - Data is the new oil

## Theory:

### Topics Covered:

- Seperation of a React Application into UI-Layer and Data-Layer
- Controlled and Uncontrolled Components
- Prop Driling
- Context API in React


Great list! These are core concepts that form the **architecture and state management backbone** of React apps. Let’s dive into each one in detail, with **definitions**, **explanations**, and **examples** where useful.

---

### ✅ 1. **Separation of a React Application into UI-Layer and Data-Layer**

**Definition:**  
Breaking the application into:
- **UI Layer**: Handles the look and feel (components, layout, styles).
- **Data Layer**: Handles logic, state management, API calls, data flow.

**Why:**  
- Improves **readability and testability**.
- Encourages **clean architecture**.
- Helps with **scaling** large apps.

**Example:**
```jsx
// UI Layer
function ProductCard({ product, onAddToCart }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product)}>Add to cart</button>
    </div>
  );
}

// Data Layer
function ProductContainer() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return <ProductCard product={someProduct} onAddToCart={handleAddToCart} />;
}
```

---

### ✅ 2. **Controlled and Uncontrolled Components**

| Feature | Controlled | Uncontrolled |
|--------|------------|--------------|
| Data managed by | React (via `useState`) | DOM (using refs) |
| Real-time control | ✅ | ❌ |
| React Form Libraries Support | ✅ | ❌ |
| Simpler for small cases | ❌ | ✅ |

**Controlled Example:**
```js
const [inputValue, setInputValue] = useState('');

<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
```

**Uncontrolled Example:**
```js
const inputRef = useRef();

<input ref={inputRef} />
<button onClick={() => console.log(inputRef.current.value)}>Log</button>
```

---

### ✅ 3. **Prop Drilling**

**Definition:**  
Passing props through **multiple intermediate components** to reach a deeply nested child.

**Why it's a problem:**  
- Makes code **messy** and **hard to maintain**.
- Breaks **encapsulation**.

**Example:**
```jsx
function App() {
  return <Parent name="Alice" />;
}

function Parent({ name }) {
  return <Child name={name} />;
}

function Child({ name }) {
  return <GrandChild name={name} />;
}

function GrandChild({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

**Fix:** Use **Context API** to avoid prop drilling.

---

### ✅ 4. **Context API in React**

**Definition:**  
A way to **share state globally** across the component tree without prop drilling.

**How it works:**
1. Create context: `const ThemeContext = React.createContext();`
2. Provide value with `<ThemeContext.Provider>`
3. Consume value using `useContext(ThemeContext)` or `<ThemeContext.Consumer>`

---

### ✅ 5. **Higher Order Component (HOC)**

**Definition:**  
A **function** that takes a component and **returns a new component** with added functionality.

**Syntax:**
```js
function withLogger(WrappedComponent) {
  return function EnhancedComponent(props) {
    console.log('Rendering', WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };
}
```

**Use Case:**  
Reusing logic like logging, authentication, data fetching.

---

### ✅ 6. **What is Prop Drilling?**  
(Same as #3 above — definition repeated for clarity)

**Prop Drilling** is when you pass props down multiple layers of components to reach the target component.  
It becomes messy and unscalable in large applications.

---

### ✅ 7. **What is Lifting the State Up?**

**Definition:**  
Moving state from a **child component to a common parent** to share the state across sibling components.

**Example:**
```js
function Parent() {
  const [value, setValue] = useState('');

  return (
    <>
      <Input value={value} setValue={setValue} />
      <Display value={value} />
    </>
  );
}
```

---

### ✅ 8. **What are Context Provider and Context Consumer?**

- **Provider**: Supplies the data.
- **Consumer**: Receives and uses the data.

```js
const ThemeContext = React.createContext('light');

// Provider
<ThemeContext.Provider value="dark">
  <Child />
</ThemeContext.Provider>

// Consumer using useContext
const theme = useContext(ThemeContext);
```

---

### ✅ 9. **If you don't pass a value to the provider, does it take the default value?**

**Yes**, it takes the **default value** provided when the context was created:

```js
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider>
      <Child />
    </ThemeContext.Provider>
  );
}

// Will get "light" because no value was passed explicitly
```

---

Let me know if you'd like a **real-world example** that ties all of these together (like a theme switcher or shopping cart), or a **cheat sheet** to revise quickly.