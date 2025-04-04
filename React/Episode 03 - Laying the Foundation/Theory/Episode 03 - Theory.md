## Namaste React Course by Akshay Saini

# Episode 03 - Laying the Foundation

## Q: What is `JSX`?

A: JSX stands for JavaScript XML.
JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods.
JSX makes it easier to write and add HTML in React.
JSX converts HTML tags into react elements.

### Example 1 using JSX:

```
const myElement = <h1>I Love JSX!</h1>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myElement);
```

### Example 2 Without JSX:

```
const myElement = React.createElement('h1', {}, 'I do not use JSX!');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myElement);
```

## Q: Superpowers of `JSX`.

A: Using JSX, you can write markup inside Javascript, providing you with a superpower to write logic and markup of a component inside a single .jsx file. JSX is easy to maintain and debug.

### Example

```
function greeting(user) {
//JSX
  return <h1>{user}, How are you!!!</h1>;
}
```

## Q: Role of `type` attribute in script tag? What options can I use there?

A: The `type` attribute specifies the type of the script. The type attribute identifies the content between the `<script>` and `</script>` tags. It has a Default value which is “text/javascript”.

### `type` attribute can be of the following types:

- `text/javascript` : It is the basic standard of writing javascript code inside the `<script>` tag.
  ### Syntax
  ```
  <script type="text/javascript"></script>
  ```
- `text/ecmascript` : this value indicates that the script is following the `EcmaScript` standards.
- `module`: This value tells the browser that the script is a module that can import or export other files or modules inside it.
- `text/babel` : This value indicates that the script is a babel type and required bable to transpile it.
- `text/typescript`: As the name suggest the script is written in `TypeScript`.





Great! Here's a clean explanation of these 3 React concepts:

---

## 🧩 1. **Components**
In React, a **component** is a reusable piece of UI — like a button, form, navbar, or the whole app!

### ✅ Example:
```jsx
function Hello() {
  return <h1>Hello World</h1>;
}
```
You can use it like this:
```jsx
<Hello />
```

---

## ⚙️ 2. **Functional Components**
These are the most common type of components. They're just **JavaScript functions** that return JSX.

### ✅ Syntax:
```jsx
function Welcome(props) {
  return <h2>Welcome, {props.name}!</h2>;
}
```
You can also use **arrow functions**:
```jsx
const Welcome = ({ name }) => <h2>Welcome, {name}!</h2>;
```

---

## 🧱 3. **Composing Components**
**Composing** means combining multiple components together to build a UI.

### ✅ Example:
```jsx
function Header() {
  return <h1>My App</h1>;
}

function Footer() {
  return <p>© 2025</p>;
}

function App() {
  return (
    <div>
      <Header />
      <p>This is the main content</p>
      <Footer />
    </div>
  );
}
```

💡 **Think of it like LEGO blocks — build small components, then combine them to create complex UIs.**

---

### 🚀 Summary:
| Concept               | Description                              |
|-----------------------|------------------------------------------|
| **Component**         | Reusable UI block                        |
| **Functional Component** | A function that returns JSX              |
| **Composing Components** | Nesting components inside each other     |

Want a quick project idea using these three?









## Q: `{TitleComponent}` vs `{<TitleComponent/>}` vs `{<TitleComponent></TitleComponent>}` in `JSX`.

A: The Difference is stated below:

- `{TitleComponent}`: This value describes the `TitleComponent` as a javascript expression or a variable.
  The `{}` can embed a javascript expression or a variable inside it.
- `<TitleComponent/>` : This value represents a Component that is basically returning Some JSX value. In simple terms `TitleComponent` a function that is returning a JSX value.
  A component is written inside the `{<  />}` expression.
- `<TitleComponent></TitleComponent>` : `<TitleComponent />` and `<TitleComponent></TitleComponent>` are equivalent only when `< TitleComponent />` has no child components. The opening and closing tags are created to include the child components.

### Example

```
<TitleComponent>
    <FirstChildComponent />
    <SecondChildComponent />
    <ThirdChildComponent />
</TitleComponent>
```

### if there are no child elements, then we can write

```
<TitleComponent />
```









### 📌 **JSX Tags and Attributes in React**  

JSX (JavaScript XML) is an extension of JavaScript that allows us to write HTML-like syntax in React. Let's go over different **tags** and **attributes** used in JSX.

---

## **1️⃣ Types of JSX Tags**
JSX supports two types of tags:

### **✅ HTML Tags (Built-in)**
These are normal HTML elements that work inside JSX:
```jsx
<div>Hello, JSX!</div>
<p>This is a paragraph.</p>
<input type="text" />
```

### **✅ React Component Tags (Custom)**
Custom components should start with an **uppercase letter**:
```jsx
function MyComponent() {
  return <h1>Hello from MyComponent</h1>;
}

<MyComponent />
```

---

## **2️⃣ Common JSX Attributes**
JSX attributes are similar to HTML but follow **camelCase** for multi-word attributes.

### **✅ Standard Attributes**
| **HTML Attribute** | **JSX Equivalent** | **Example** |
|------------------|----------------|----------------------------|
| `class`         | `className`     | `<div className="container">` |
| `for`           | `htmlFor`       | `<label htmlFor="name">` |
| `onclick`       | `onClick`       | `<button onClick={handleClick}>Click</button>` |
| `readonly`      | `readOnly`      | `<input readOnly />` |
| `tabindex`      | `tabIndex`      | `<div tabIndex={0}>` |

---

## **3️⃣ Dynamic Attributes in JSX**
JSX allows you to use **JavaScript expressions** inside `{}`.

### **✅ String Attribute**
```jsx
<img src="logo.png" alt="Logo" />
```

### **✅ Dynamic Attribute**
```jsx
const title = "Welcome!";
<h1>{title}</h1>
```

### **✅ Boolean Attributes (No Need for `true`)**
```jsx
<input type="checkbox" checked />
```

### **✅ Style Attribute (Uses Object)**
```jsx
const style = { color: "blue", fontSize: "20px" };
<p style={style}>Styled Text</p>
```

---

## **4️⃣ Special JSX Attributes**
### **✅ `children` (For Wrapping Content)**
```jsx
<MyComponent>Some Text Inside</MyComponent>
```

### **✅ Spread Attributes (`...props`)**
```jsx
const props = { type: "text", placeholder: "Enter Name" };
<input {...props} />
```

---

## 🚀 **Quick JSX Rules**
✅ Always **return a single parent element**  
✅ Use **camelCase** for attributes  
✅ Wrap multiple elements in **fragments (`<>...</>`)**  
✅ JavaScript inside `{}`  
✅ **Self-close** tags like `<img />`, `<input />`  

---
🚀