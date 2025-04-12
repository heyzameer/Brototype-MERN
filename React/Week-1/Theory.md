## Setting Up ReactJS Environment with Vite (Create-react-app is outdated now, Don't use it.)

You're right! Vite has become the modern and recommended way to quickly bootstrap React projects due to its speed and efficiency.

### Introduction to Vite

**What is Vite?**

Vite (pronounced "veet") is a next-generation frontend tooling that provides a significantly faster and leaner development experience for modern web projects. It leverages native ES Modules in the browser during development, eliminating the need for bundling. For production, it bundles your code with Rollup, which is known for its efficient code splitting.

Vite is a fast frontend build tool that uses native ES modules in development and bundles code with lightning speed for production.

**Advantages of Vite over CRA:**

*   **Fast Development Server:** Vite utilizes native browser ES Modules, meaning your code isn't bundled during development. This results in incredibly fast server startup times (often under a second) and near-instantaneous Hot Module Replacement (HMR). CRA, on the other hand, needs to bundle your entire application before the development server starts, leading to longer wait times, especially in larger projects.
*   **Optimized Builds:** Vite uses Rollup for production builds, which is highly optimized for code splitting and tree-shaking, resulting in smaller and more efficient bundles compared to CRA's Webpack configuration (without significant customization).
*   **Lightweight Configuration:** Vite comes with sensible defaults and requires minimal configuration out of the box. This makes it easier to get started and reduces the complexity often associated with configuring Webpack in CRA.
*   **Built-in Support for Modern Features:** Vite has first-class support for TypeScript, JSX, CSS Preprocessors (like Sass and Less), CSS Modules, and more, without requiring extensive configuration.

### Setting up a React project using Vite

1.  **Ensure Node.js and npm/yarn/pnpm are installed:** You need Node.js (version 14.18+ or 16+) installed on your system. npm comes bundled with Node.js. You can also use yarn or pnpm as package managers.

2.  **Open your terminal or command prompt.**

3.  **Navigate to the directory where you want to create your project.**

4.  **Run the following command using your preferred package manager:**

    **npm:**
    \`\`\`bash
    npm create vite@latest my-react-app --template react
    cd my-react-app
    npm install
    npm run dev
    \`\`\`

    **yarn:**
    \`\`\`bash
    yarn create vite my-react-app --template react
    cd my-react-app
    yarn install
    yarn dev
    \`\`\`

    **pnpm:**
    \`\`\`bash
    pnpm create vite my-react-app --template react
    cd my-react-app
    pnpm install
    pnpm dev
    \`\`\`

    Replace `my-react-app` with your desired project name. The `--template react` flag specifies that you want to create a React project.

5.  **Follow the on-screen instructions:** Vite will scaffold a basic React project for you.

6.  **Start the development server:** After navigating into your project directory (`cd my-react-app`) and installing the dependencies (`npm install` or `yarn install` or `pnpm install`), run the development server using `npm run dev`, `yarn dev`, or `pnpm dev`.

7.  **Open your browser:** The terminal will usually tell you the local URL where the development server is running (typically `http://localhost:5173/`). Open this URL in your web browser to see your basic React application.









**What is Vite?**

*   **Definition:** As explained above, Vite is a build tool that significantly improves the frontend development workflow by providing speed and efficiency.
*   **Explanation:** Its core innovation lies in serving code via native ES Modules during development and bundling it with Rollup for production. This approach addresses the performance bottlenecks often encountered with older bundling tools, especially in larger projects.

**Advantages of Vite over CRA:**

*   **Fast development server:**
    *   **Definition:** Vite's development server starts almost instantly.
    *   **Explanation:** By leveraging native ES Modules, Vite only needs to process and serve the modules requested by the browser, on demand. This eliminates the initial bundling phase, making startup incredibly fast. HMR is also much faster as only the changed module needs to be updated.
    *   **Example:** When you run `npm run dev` in a Vite project, the server typically starts in under a second, even for relatively large projects. In contrast, CRA can take several seconds or even minutes for larger applications.
*   **Optimized builds:**
    *   **Definition:** Vite uses Rollup to produce highly optimized production bundles.
    *   **Explanation:** Rollup is known for its efficient tree-shaking (removing unused code) and code splitting capabilities. This results in smaller bundle sizes, leading to faster loading times for your users.
    *   **Example:** Building a similar-sized React application with Vite often results in smaller `dist` folder sizes compared to the default output of CRA.
*   **Lightweight configuration:**
    *   **Definition:** Vite requires minimal configuration to get started.
    *   **Explanation:** Vite comes with sensible defaults and built-in support for many common web development features like TypeScript, JSX, and CSS preprocessors. This reduces the need to manually configure complex build pipelines.
    *   **Example:** A fresh Vite React project has a very concise `vite.config.js` file (or might not even need one initially), whereas a customized CRA setup often involves dealing with potentially complex Webpack configurations.

**Setting up a React project using Vite:**

*   **Definition:** The process of creating a new React project using Vite's command-line interface.
*   **Explanation:** As demonstrated in the previous response, you use `npm create vite@latest` (or the equivalent with yarn/pnpm) and specify the `react` template to quickly scaffold a basic React project with all the necessary configurations.
*   **Example:** (Refer to the `npm create vite...` commands provided earlier).

**Understanding `vite.config.js` and basic project structure:**

*   **`vite.config.js` Definition:** The configuration file for Vite, allowing customization of its behavior.
*   **`vite.config.js` Explanation:** This file (located at the root of your project) is where you can configure various aspects of your Vite build process, development server, and more. Common configurations include:
    *   `plugins`: Adding Vite plugins for extra functionality (e.g., integrating with backend frameworks).
    *   `server`: Configuring the development server (e.g., port, proxy).
    *   `build`: Customizing the production build process (e.g., output directory).
    *   `resolve`: Configuring module resolution (e.g., aliases).
*   **`vite.config.js` Example:**
    \`\`\`javascript
    // vite.config.js
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      server: {
        port: 3000,
        proxy: {
          '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
      resolve: {
        alias: {
          '@': '/src',
          'components': '/src/components',
        },
      },
      build: {
        outDir: 'dist',
      },
    });
    \`\`\`
*   **Basic Project Structure Definition:** The standard organization of files and folders in a Vite-powered React project.
*   **Basic Project Structure Explanation:** A typical Vite React project structure looks something like this:
    \`\`\`
    my-react-app/
    ├── index.html         # Main HTML entry point
    ├── src/
    │   ├── main.jsx        # Entry point for React application
    │   ├── App.jsx         # Root React component
    │   ├── assets/         # For static assets (images, etc.)
    │   ├── components/     # (Optional) For your React components
    │   ├── hooks/          # (Optional) For your custom React hooks
    │   └── ...             # Other source code
    ├── public/            # Static assets to be served directly
    ├── vite.config.js     # Vite configuration file
    ├── package.json       # npm/yarn/pnpm project file
    ├── package-lock.json  # (npm) Dependency lock file
    ├── yarn.lock          # (yarn) Dependency lock file
    └── pnpm-lock.yaml     # (pnpm) Dependency lock file
    \`\`\`

## DOM Concepts in Javascript

**DOM concepts in Javascript**

*   **Definition:** The Document Object Model (DOM) is a programming interface for web documents. It represents the page structure as a tree of objects, where each object represents a part of the document (e.g., an element, attribute, or text). JavaScript can interact with the DOM to dynamically manipulate the content, structure, and style of a web page.
*   **Explanation:** When a web browser loads an HTML document, it parses the HTML and creates an internal representation of the document as a DOM tree. JavaScript provides APIs (methods and properties) to traverse this tree, access nodes (elements), modify their content, attributes, and styles, and respond to events.
*   **Example:**
    \`\`\`javascript
    // HTML (in index.html or a component's return statement)
    <div id="myDiv">Hello, DOM!</div>
    \`\`\`
    \`\`\`javascript
    // JavaScript
    const myDivElement = document.getElementById('myDiv');
    console.log(myDivElement.textContent); // Output: Hello, DOM!
    myDivElement.textContent = 'Updated DOM!';
    myDivElement.style.color = 'blue';
    \`\`\`

**Difference between actual DOM and virtual DOM**

*   **Actual DOM Definition:** The real, live DOM that the browser renders and updates.
*   **Actual DOM Explanation:** When changes occur in a web application, the browser needs to update the actual DOM. These updates can be expensive, especially for complex UIs, as they involve re-rendering parts of the page and potentially triggering reflows and repaints.
*   **Virtual DOM Definition:** A lightweight, in-memory representation of the actual DOM. It's a JavaScript object.
*   **Virtual DOM Explanation:** React (and some other libraries) use a virtual DOM as an abstraction layer between the application's state and the actual DOM. When changes occur, React first updates its virtual DOM. It then compares the previous virtual DOM with the new one (this process is called "diffing") to identify the minimal set of changes that need to be applied to the actual DOM. This batching of updates and targeted manipulation of the real DOM leads to significant performance improvements.
*   **Analogy:** Imagine editing a blueprint (virtual DOM) of a house before making the actual changes to the real house (actual DOM). You can make multiple changes on the blueprint efficiently, and then decide on the most efficient way to apply those changes to the real house at once.

**Difference between single Page and multi-page application**

*   **Single Page Application (SPA) Definition:** A web application that loads a single HTML page and dynamically updates the content within that page as the user interacts with it, without requiring full page reloads.
*   **SPA Explanation:** SPAs provide a more fluid and interactive user experience, similar to desktop applications. Technologies like React, Angular, and Vue are commonly used to build SPAs. When the user navigates to different sections of the application, JavaScript intercepts the request and updates the relevant parts of the DOM.
*   **SPA Example:** Gmail, Facebook, Twitter, and most modern web applications are SPAs. When you click on different links or buttons, the page doesn't fully reload; only the content within the current page changes.
*   **Multi-Page Application (MPA) Definition:** A traditional web application where each user interaction or navigation triggers a full page reload from the server.
*   **MPA Explanation:** In MPAs, the server generates a new HTML page for each request. While simpler to develop for some scenarios, this can lead to a less seamless user experience due to the full page reloads.
*   **MPA Example:** Older websites or some content-heavy websites might still follow the MPA approach. When you click a link, the browser sends a request to the server, and the server sends back a completely new HTML page.

**CSR vs SSR**

*   **Client-Side Rendering (CSR) Definition:** A rendering technique where the initial HTML sent from the server is minimal, and the browser (client-side JavaScript) is responsible for fetching data, rendering the UI, and handling most of the application logic.
*   **CSR Explanation:** SPAs heavily rely on CSR. The initial load might take slightly longer as the browser needs to download and execute the JavaScript code before rendering the content. However, subsequent interactions and page transitions are generally faster as only data needs to be fetched and the DOM updated.
*   **CSR Advantages:** Rich interactivity, faster subsequent page loads.
*   **CSR Disadvantages:** Initial load time can be longer, potential issues with SEO (search engine optimization) as crawlers might not execute JavaScript.

*   **Server-Side Rendering (SSR) Definition:** A rendering technique where the server generates the fully rendered HTML page and sends it to the browser. The browser then hydrates the static HTML by downloading and executing the JavaScript code, making it interactive.
*   **SSR Explanation:** SSR aims to improve the initial load time and SEO for SPAs. The user sees content faster as the server provides a ready-to-display HTML. Once the JavaScript is downloaded, the React application takes over and behaves like a typical SPA.
*   **SSR Advantages:** Faster initial load time, better SEO.
*   **SSR Disadvantages:** Server load can be higher as it needs to render HTML for each request, can be more complex to implement.
*   **Note:** Frameworks like Next.js for React make implementing SSR easier.

## Q: What is the difference between `Client Side Routing` and `Server Side Routing`?

A: In `Server-side routing or rendering (SSR)`, every change in URL, http request is made to server to fetch the webpage, and replace the current webpage with the older one.

In `Client-side routing or rendering (CSR)`, during the first load, the webapp is loaded from server to client, after which whenever there is a change in URL, the router library navigates the user to the new page without sending any request to backend. All `Single Page Applications uses client-side routing`.


Sure! Here are the clean, simple definitions for both:

---

### ✅ **Client Side Routing**

**Definition**:  
Client Side Routing is a navigation technique used in single-page applications (SPAs) where the browser handles route changes without making a full page request to the server. It uses JavaScript to load and display components based on the URL, providing a smoother and faster user experience.

🧠 *Example*: In a React app using React Router, clicking on a link updates the URL and shows a new component—without reloading the page.

---

### ✅ **Server Side Routing**

**Definition**:  
Server Side Routing is a traditional routing method where every time the URL changes, the browser sends a request to the server, and the server responds with a complete new HTML page. Each route is handled by the server, and a full page reload occurs on navigation.

🧠 *Example*: In a PHP or Django website, clicking a link sends a request to the server, which returns a new web page.

---


**Concept of reusability**

*   **Definition:** The principle of designing and developing components or code modules that can be used in multiple parts of an application or even in different projects without modification or with minimal adjustments.
*   **Explanation:** Reusability is a cornerstone of efficient software development. In React, this is primarily achieved through creating reusable components. By breaking down the UI into smaller, self-contained components, you can avoid writing the same code multiple times, leading to:
    *   **Reduced development time:** Components can be reused instead of being built from scratch.
    *   **Improved maintainability:** Changes or bug fixes in a reusable component automatically apply to all its usages.
    *   **Increased code consistency:** Using the same components across the application ensures a consistent look and feel.
    *   **Easier testing:** Reusable components can be tested in isolation.
*   **Example:** A "Button" component that can be used in various parts of your application with different text and click handlers.
    ```jsx
    // Button.jsx
    import React from 'react';

    function Button({ label, onClick }) {
      return <button onClick={onClick}>{label}</button>;
    }

    export default Button;
    ```
    ```jsx
    // SomeOtherComponent.jsx
    import React from 'react';
    import Button from './Button';

    function SomeOtherComponent() {
      const handleClick = () => {
        alert('Button clicked!');
      };

      return (
        <div>
          <Button label="Click Me" onClick={handleClick} />
          <Button label="Save" onClick={() => console.log('Saving...')} />
        </div>
      );
    }

    export default SomeOtherComponent;
    ```
Great! Let's break down the concepts of **Hooks**, **Props**, and **State** in React, as they are foundational to how React works.

---

### 1. **Props (Short for "Properties")**

**Props** are used to pass data from a **parent component** to a **child component**. They are **read-only** and can't be modified by the child component. Props allow components to be **dynamic** and configurable, as different props can be passed into the same component.

#### Example:
```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return <Greeting name="Alice" />;
}
```
In the above example, the `Greeting` component receives the `name` prop from the `App` component, and it displays "Hello, Alice!".

**Key Points:**
- **Props** are passed from parent to child components.
- They are **immutable** within the child component.
- They are used to pass data or event handlers to children.

---

### 2. **State**

**State** represents a component’s local data, and it can change over time, which causes the component to re-render. State is managed inside the component, and unlike props, **state is mutable** and can be updated using functions like `setState` (for class components) or state hooks (for functional components with hooks).

#### Example:
```jsx
import React, { useState } from "react";

function Counter() {
  // Initialize state variable 'count' with initial value 0
  const [count, setCount] = useState(0);

  // Function to increment the count
  const increment = () => setCount(count + 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```
In the above example:
- **State (`count`)** is used to keep track of the number of times the button is clicked.
- The `useState` hook initializes the state with a value (`0`).
- The `setCount` function updates the state and triggers a re-render.

**Key Points:**
- **State** is used to track local data within a component.
- **State** can be changed and triggers a re-render.
- In functional components, we use the `useState` hook to handle state.



// * React Hook -> A normal JavaScript function which is given to us by React (or) Normal JS utility functions

//*React Hooks are functions that let you use state and other React features in functional components.

// * In React, state is an object that holds data or information about a component and determines how that component behaves or renders

  
// * In React, **props** (short for "properties") are read-only inputs passed from a parent component to a child component to customize or configure it.

// * useState() - Super Powerful variable
// * useEffect() - 

//* wheneever state variable changes react re renders the component
---

### 3. **Hooks**

**Hooks** are special functions that allow you to "hook into" React features, such as **state** and **lifecycle methods**, in **functional components**. They were introduced in React 16.8 to make functional components more powerful.

#### Common React Hooks:

- **`useState`**: Manages state in functional components.
- **`useEffect`**: Performs side effects like data fetching, subscribing to events, or manually changing the DOM.
- **`useContext`**: Allows you to consume values from React's Context API (for global state management).
- **`useRef`**: Provides a way to persist values across renders without causing a re-render.
- **`useMemo`**: Memoizes values to optimize performance by recomputing only when necessary.
- **`useCallback`**: Returns a memoized version of a callback function.

#### Example of `useState` and `useEffect` Hooks:
```jsx
import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0); // State to track time

  useEffect(() => {
    // This will run when the component is mounted
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1); // Increment seconds every 1 second
    }, 1000);

    return () => clearInterval(interval); // Cleanup when component unmounts
  }, []); // Empty array means it runs only once (on mount)

  return <p>Time: {seconds} seconds</p>;
}
```

In this example:
- **`useState`** is used to keep track of the `seconds` state.
- **`useEffect`** is used to start a timer when the component mounts and stop it when the component unmounts.

**Key Points:**
- **Hooks** allow you to manage state, handle side effects, and access other React features in functional components.
- They **replace** the need for class-based lifecycle methods (like `componentDidMount`, `componentDidUpdate`, etc.).

---

### **Differences Between Props, State, and Hooks**

| Concept    | Description                                                  | Modifiable | Managed By                 | Example                                      |
|------------|--------------------------------------------------------------|------------|----------------------------|----------------------------------------------|
| **Props**  | Used to pass data from parent to child components             | No         | Parent Component           | `<Greeting name="Alice" />`                  |
| **State**  | Represents local data that can change and trigger re-renders | Yes        | Component (using `useState` or `setState`) | `const [count, setCount] = useState(0);` |
| **Hooks**  | Functions that allow access to React features (like state and side effects) in functional components | Yes (for state hooks) | React, inside functional components | `useState()`, `useEffect()` |

---

### **When to Use Each?**
- **Props**: Use when you need to pass data or functions **from a parent to a child component**. This is usually for **communication** between components.
- **State**: Use when you need to manage **local data** that can change over time within a component, such as form inputs, counters, or toggles.
- **Hooks**: Use hooks like `useState` and `useEffect` to manage state, side effects, and other features in **functional components**.

---

Let me know if you want examples of specific hooks or more detailed explanations of any of these concepts!



## Learn about es6 versions syntaxes

**Arrow functions**

*   **Definition:** A concise syntax for writing function expressions in JavaScript, introduced in ES6.
*   **Explanation:** Arrow functions provide a more compact way to define functions compared to traditional function expressions. They also have lexical `this` binding, meaning `this` inside an arrow function refers to the `this` value of the surrounding code.
*   **Example:**
    ```javascript
    // Traditional function expression
    function add(a, b) {
      return a + b;
    }

    // Arrow function equivalent
    const addArrow = (a, b) => a + b;

    console.log(add(5, 3)); // Output: 8
    console.log(addArrow(5, 3)); // Output: 8

    // Arrow function with a single parameter (parentheses optional)
    const square = num => num * num;
    console.log(square(4)); // Output: 16

    // Arrow function with no parameters
    const greet = () => console.log('Hello!');
    greet(); // Output: Hello!

    // Arrow function with a block body (return statement required)
    const multiply = (x, y) => {
      const result = x * y;
      return result;
    };
    console.log(multiply(2, 6)); // Output: 12
    \`\`\`

**Map**

*   **Definition:** A method available on arrays in JavaScript (introduced in ES5, but heavily used with ES6 features). It creates a *new* array by calling a provided callback function on each element in the original array.
*   **Explanation:** `map()` is used when you want to transform each element of an array into something else. The callback function receives the current element as an argument and returns the transformed value, which is then added to the new array.
*   **Example:**
    ```javascript
    const numbers = [1, 2, 3, 4, 5];

    // Double each number
    const doubledNumbers = numbers.map(number => number * 2);
    console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]

    const names = ['alice', 'bob', 'charlie'];

    // Capitalize each name
    const capitalizedNames = names.map(name => name.toUpperCase());
    console.log(capitalizedNames); // Output: ['ALICE', 'BOB', 'CHARLIE']
    \`\`\`

**Destructuring**

*   **Definition:** An ES6 feature that allows you to extract values from arrays or properties from objects and assign them to distinct variables in a concise way.
*   **Explanation:** Destructuring makes your code cleaner and more readable when dealing with accessing specific elements in arrays or properties in objects.
*   **Example (Array Destructuring):**
    ```javascript
    const colors = ['red', 'green', 'blue'];
    const [firstColor, secondColor, thirdColor] = colors;

    console.log(firstColor);  // Output: red
    console.log(secondColor); // Output: green
    console.log(thirdColor);  // Output: blue

    // Ignoring elements
    const [, , lastColor] = colors;
    console.log(lastColor);   // Output: blue

    // Rest parameter to collect remaining elements
    const [primary, ...others] = colors;
    console.log(primary); // Output: red
    console.log(others);  // Output: ['green', 'blue']
    \`\`\`
*   **Example (Object Destructuring):**
    ```javascript
    const person = {
      name: 'John Doe',
      age: 30,
      city: 'New York'
    };

    const { name, age, city } = person;
    console.log(name); // Output: John Doe
    console.log(age);  // Output: 30
    console.log(city); // Output: New York

    // Renaming properties during destructuring
    const { name: personName, age: personAge } = person;
    console.log(personName); // Output: John Doe
    console.log(personAge);  // Output: 30

    // Providing default values if the property doesn't exist
    const { country = 'USA' } = person;
    console.log(country); // Output: USA
    \`\`\`

**Filter**

*   **Definition:** A method available on arrays in JavaScript (ES5). It creates a *new* array with all elements that pass the test implemented by the provided callback function.
*   **Explanation:** `filter()` is used when you want to select a subset of elements from an array based on a specific condition. The callback function receives each element and should return `true` if the element should be included in the new array, and `false` otherwise.
*   **Example:**
    ```javascript
    const numbers = [10, 5, 20, 8, 15];

    // Filter out numbers greater than 10
    const greaterThanTen = numbers.filter(number => number > 10);
    console.log(greaterThanTen); // Output: [20, 15]

    const users = [
      { id: 1, isActive: true },
      { id: 2, isActive: false },
      { id: 3, isActive: true },
    ];

    // Filter out active users
    const activeUsers = users.filter(user => user.isActive);
    console.log(activeUsers);
    // Output: [
    //   { id: 1, isActive: true },
    //   { id: 3, isActive: true }
    // ]
    \`\`\`

**Reduce**

*   **Definition:** A method available on arrays in JavaScript (ES5). It executes a provided "reducer" callback function on each element of the array, resulting in a single output value.
*   **Explanation:** `reduce()` is useful for performing calculations or aggregations on the elements of an array (e.g., summing numbers, concatenating strings, grouping objects). The reducer function takes two main arguments: an accumulator (which accumulates the result) and the current element.
*   **Example:**
    ```javascript
    const numbers = [1, 2, 3, 4, 5];

    // Sum all numbers in the array
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(sum); // Output: 15 (initial accumulator value is 0)

    const words = ['hello', ' ', 'world', '!'];

    // Concatenate all words
    const sentence = words.reduce((accumulator, currentValue) => accumulator + currentValue, '');
    console.log(sentence); // Output: hello world! (initial accumulator is '')

    const items = [
      { name: 'Apple', price: 1 },
      { name: 'Banana', price: 0.5 },
      { name: 'Orange', price: 0.75 },
    ];

    // Calculate the total price
    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
    console.log(totalPrice); // Output: 2.25
    \`\`\`

**Import/Export**

*   **Definition:** ES6 modules provide a standardized way to organize and share JavaScript code across different files. `import` is used to bring in functionality (variables, functions, classes) from other modules, and `export` is used to make them available for import.
*   **Explanation:** Modules help to keep your code modular, maintainable, and prevent naming conflicts.
*   **Example:**
     ```javascript
    // math.js (exporting functions)
    export const add = (a, b) => a + b;
    export function subtract(a, b) {
      return a - b;
    }
    const PI = 3.14159;
    export { PI }; // Named export

    const multiply = (a, b) => a * b;
    export default multiply; // Default export (only one per module)
    \`\`\`

     ```javascript
    // main.js (importing functions)
    import multiplyByDefault, { add, subtract, PI } from './math.js';
    import * as MathUtils from './math.js'; // Import everything as an object

    console.log(add(5, 3)); // Output: 8
    console.log(subtract(10, 4)); // Output: 6
    console.log(PI); // Output: 3.14159
    console.log(multiplyByDefault(2, 7)); // Output: 14
    console.log(MathUtils.add(1, 1)); // Output: 2
    \`\`\`

**Difference between JSX and HTML**

*   **JSX Definition:** A syntax extension to JavaScript that looks similar to HTML. It is used in React to describe what the UI should look like. JSX gets transformed into regular JavaScript function calls that create React elements.
*   **JSX Explanation:** JSX allows developers to write UI structures in a declarative way, embedding them directly within their JavaScript code. Browsers don't understand JSX directly; it needs to be transpiled (usually using Babel) into standard JavaScript.
*   **Key Differences:**
    *   **JavaScript Expressions:** You can embed JavaScript expressions within JSX using curly braces `{}`.
    *   **Attributes:** HTML attributes have some differences in JSX (e.g., `class` becomes `className`, `tabindex` becomes `tabIndex`).
    *   **Self-Closing Tags:** JSX enforces self-closing tags for elements that don't have children (e.g., `<img />`, `<br />`).
    *   **One Root Element:** A JSX element must have a single top-level parent element (or a Fragment `<></>`).
*   **HTML Definition:** HyperText Markup Language is the standard markup language for creating web pages. It uses tags to structure content.
*   **HTML Explanation:** HTML is interpreted directly by web browsers to render the structure and content of a web page.
*   **Example:**
     ```jsx
    // JSX in a React component
    function Greeting({ name }) {
      const message = `Hello, ${name}!`;
      return (
        <div className="greeting">
          <h1>{message.toUpperCase()}</h1>
          <p>Welcome to our website.</p>
          <img src="/logo.png" alt="Logo" />
        </div>
      );
    }
    ```

    This JSX will be transformed into JavaScript code that creates React elements, which React will then use to update the actual DOM. The equivalent conceptual HTML might look like:
    ```html
    <!-- Conceptual HTML equivalent -->
    <div class="greeting">
      <h1>HELLO, [NAME]!</h1>
      <p>Welcome to our website.</p>
      <img src="/logo.png" alt="Logo">
    </div>
    \`\`\`

## Learn about components

**Class Components (basic - lifecycle methods)**

*   **Definition:** React components written as JavaScript classes that extend `React.Component`. They have state, props, and lifecycle methods.
*   **Explanation:** Class components were the primary way to create stateful and more complex components in earlier versions of React. They have access to lifecycle methods that allow you to perform actions at different stages of the component's existence (mounting, updating, unmounting).
*   **Basic Lifecycle Methods:**
    *   **`constructor(props)`:** Called when the component is created. Used to initialize state and bind event handlers.
    *   **`render()`:** The only required method. Returns the JSX that describes what should be rendered to the UI. It should be a pure function of props and state.
    *   **`componentDidMount()`:** Called after the component is inserted into the DOM. It's a good place for fetching data, setting up subscriptions, or directly interacting with the DOM.
    *   **`componentDidUpdate(prevProps, prevState, snapshot)`:** Called after the component's rendering updates the DOM. You can perform side effects here based on changes in props or state.
    *   **`componentWillUnmount()`:** Called just before the component is removed from the DOM. Use this to clean up any resources (e.g., timers, event listeners) that were set up in `componentDidMount`.
*   **Example:**
    ```jsx
    import React from 'react';

    class Counter extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          count: 0
        };
        this.increment = this.increment.bind(this); // Binding event handler
      }

      increment() {
        this.setState(prevState => ({
          count: prevState.count + 1
        }));
      }

      componentDidMount() {
        console.log('Counter component mounted.');
        this.intervalId = setInterval(() => {
          console.log('Count:', this.state.count);
        }, 1000);
      }

      componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
          console.log('Counter updated:', this.state.count);
        }
      }

      componentWillUnmount() {
        console.log('Counter component will unmount.');
        clearInterval(this.intervalId);
      }

      render() {
        return (
          <div>
            <h1>Count: {this.state.count}</h1>
            <button onClick={this.increment}>Increment</button>
          </div>
        );
      }
    }

    export default Counter;
    \`\`\`

**Functional Components**

*   **Definition:** React components written as JavaScript functions. They are simpler and often preferred, especially with the introduction of Hooks.
*   **Explanation:** Functional components receive props as arguments and return JSX. They can be stateless (purely presentational) or stateful using Hooks.
*   **Example (Stateless):**
     ```jsx
    import React from 'react';

    function Greeting({ name }) {
      return <div>Hello, {name}!</div>;
    }

    export default Greeting;
    \`\`\`
*   **Example (Stateful using Hooks - see `useState` below):**
    ```js
    import React, { useState } from 'react';

    function Counter() {
      const [count, setCount] = useState(0);

      const increment = () => {
        setCount(count + 1);
      };

      return (
        <div>
          <h1>Count: {count}</h1>
          <button onClick={increment}>Increment</button>
        </div>
      );
    }

    export default Counter;
    \`\`\`

**Dynamic Rendering**

*   **Definition:** The ability of React to conditionally render different parts of the UI based on the application's state or props.
*   **Explanation:** Dynamic rendering allows you to create interactive and responsive user interfaces. You can use JavaScript's conditional statements (like `if/else`, ternary operator `?:`, logical AND `&&`) within your JSX to decide which components or elements to display.
*   **Example:**
     ```jsx
    import React, { useState } from 'react';

    function UserProfile({ isLoggedIn, username }) {
      return (
        <div>
          {isLoggedIn ? (
            <>
              <h1>Welcome, {username}!</h1>
              <button onClick={() => console.log('Logging out...')}>Logout</button>
            </>
          ) : (
            <>
              <h1>Please Log In</h1>
              <button onClick={() => console.log('Logging in...')}>Login</button>
            </>
          )}
        </div>
      );
    }

    function App() {
      const [loggedIn, setLoggedIn] = useState(false);
      const [user] = useState('Alice');

      return (
        <div>
          <UserProfile isLoggedIn={loggedIn} username={user} />
          <button onClick={() => setLoggedIn(!loggedIn)}>
            {loggedIn ? 'Switch to Logged Out' : 'Switch to Logged In'}
          </button>
        </div>
      );
    }

    export default App;
    \`\`\`

**Lifecycle Methods**

*   **Definition:** Specific methods available in React class components that are invoked at different stages of a component's lifecycle (creation, updating, removal).
*   **Explanation:** As described with Class Components, these methods allow you to hook into these stages to perform side effects, such as data fetching, setting up event listeners, or cleaning up resources.
*   **Note:** With the introduction of Hooks, functional components can achieve similar lifecycle behaviors using the `useEffect` Hook.

## Learn the concept of hooks

**`useState`**

*   **Definition:** A built-in React Hook that allows you to add state to functional components.
*   **Explanation:** `useState` returns an array with two elements: the current state value and a state setter function. Calling the setter function updates the state and triggers a re-render of the component.
*   **Example:**
    ```jsx
    import React, { useState } from 'react';

    function Example() {
      const [count, setCount] = useState(0); // Initialize state with 0

      const increment = () => {
        setCount(count + 1);
      };

      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={increment}>Click me</button>
        </div>
      );
    }

    export default Example;
    \`\`\`

**`useEffect`**

*   **Definition:** A built-in React Hook that allows you to perform side effects in functional components.
*   **Explanation:** Side effects are operations that interact with the outside world, such as data fetching, subscriptions, timers, and manual DOM manipulations. `useEffect` combines the functionality of several class component lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`). It takes a callback function that contains your side effect and an optional dependency array.
    *   **Without a dependency array:** The effect runs after every render.
    *   **With an empty dependency array (`[]`):** The effect runs only once after the initial render (like `componentDidMount`) and performs cleanup when the component unmounts (like `componentWillUnmount`)

*   **With dependencies (`dependencyArray`):** The effect runs after the initial render and whenever any of the values in the `dependencyArray` change. If you provide a cleanup function (returned by the effect callback), it runs before the next effect runs or when the component unmounts.
*   **Example (ComponentDidMount-like behavior):**
     ```jsx
    import React, { useEffect } from 'react';

    function DataFetcher() {
      useEffect(() => {
        console.log('Component mounted, fetching data...');
        fetch('https://api.example.com/data')
          .then(response => response.json())
          .then(data => console.log('Data fetched:', data));

        // Cleanup function (will run on unmount)
        return () => {
          console.log('Component will unmount, cleaning up...');
          // Any cleanup logic here (e.g., cancelling requests)
        };
      }, []); // Empty dependency array means run only once
      return <div>Fetching Data...</div>;
    }

    export default DataFetcher;
    \`\`\`
*   **Example (ComponentDidUpdate-like behavior):**
   ```jsx
    import React, { useState, useEffect } from 'react';

    function CounterLogger({ count }) {
      useEffect(() => {
        console.log('Count updated:', count);
        // Cleanup function (runs before the next effect)
        return () => {
          console.log('Previous count:', count);
        };
      }, [count]); // Effect runs whenever 'count' changes

      return <p>Current count: {count}</p>;
    }

    function App() {
      const [count, setCount] = useState(0);
      return (
        <div>
          <CounterLogger count={count} />
          <button onClick={() => setCount(count + 1)}>Increment Count</button>
        </div>
      );
    }

    export default App;
    \`\`\`

**`useRef`**

*   **Definition:** A built-in React Hook that allows you to create a mutable ref object.
*   **Explanation:** A ref object has a `current` property that can hold any mutable value. `useRef` is commonly used for:
    *   Accessing DOM elements directly (e.g., focusing an input field).
    *   Holding mutable values that persist across re-renders without causing a re-render when they change (unlike state).
*   **Example (Accessing a DOM element):**
    ```jsx
    import React, { useRef } from 'react';

    function TextInputWithFocusButton() {
      const inputEl = useRef(null);

      const focusInput = () => {
        inputEl.current.focus();
      };

      return (
        <>
          <input ref={inputEl} type="text" />
          <button onClick={focusInput}>Focus the input</button>
        </>
      );
    }

    export default TextInputWithFocusButton;
    \`\`\`
*   **Example (Holding a mutable value):**
    ```jsx
    import React, { useRef, useEffect } from 'react';

    function Timer() {
      const intervalId = useRef(null);
      const [seconds, setSeconds] = useState(0);

      useEffect(() => {
        intervalId.current = setInterval(() => {
          setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => {
          clearInterval(intervalId.current);
        };
      }, []);

      return <div>Seconds: {seconds}</div>;
    }

    export default Timer;
    \`\`\`

**`useHistory` vs `useNavigate`**

*   **Definition:** These are Hooks provided by `react-router-dom` (version 6). They allow you to programmatically navigate between different routes in your single-page application.
*   **Explanation:**
    *   **`useHistory` (React Router v5 and below):** This Hook provides access to the history object, which you can use to navigate. It's now considered legacy in React Router v6.
    *   **`useNavigate` (React Router v6):** This Hook returns a function that lets you navigate to different paths. It's the recommended way to perform programmatic navigation in React Router v6.
*   **Example (using `useNavigate` in React Router v6):**
    ```jsx
    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    function HomeButton() {
      const navigate = useNavigate();

      const goToHome = () => {
        navigate('/');
      };

      return <button onClick={goToHome}>Go to Home</button>;
    }

    function ProfileButton() {
      const navigate = useNavigate();

      const goToProfile = () => {
        navigate('/profile');
      };

      return <button onClick={goToProfile}>Go to Profile</button>;
    }

    export { HomeButton, ProfileButton };
    \`\`\`
*   **Example (Conceptual using `useHistory` in older versions):**
    ```jsx
    // React Router v5 and below (conceptual)
    import React from 'react';
    import { useHistory } from 'react-router-dom';

    function BackButton() {
      const history = useHistory();

      const goBack = () => {
        history.goBack();
      };

      return <button onClick={goBack}>Go Back</button>;
    }

    export default BackButton;
    \`\`\`
*   **Key Difference:** `useNavigate` returns a function, while `useHistory` provides the history object with methods like `push`, `replace`, and `goBack`. `useNavigate` is generally more straightforward for simple navigation tasks in React Router v6.

## Learn the concept of event handlers

**`onClick`**

*   **Definition:** A common event handler in React (and HTML) that is triggered when a user clicks on an element.
*   **Explanation:** You can attach a JavaScript function to the `onClick` prop of a React element. When the element is clicked, that function will be executed.
*   **Example:**
    ```jsx
    import React from 'react';

    function MyButton() {
      const handleClick = () => {
        alert('Button was clicked!');
      };

      return <button onClick={handleClick}>Click Me</button>;
    }

    export default MyButton;
    \`\`\`

**`onChange`**

*   **Definition:** An event handler that is typically used with form elements (like `<input>`, `<textarea>`, `<select>`). It is triggered when the value of the element changes.
*   **Explanation:** The `onChange` event allows you to listen for and respond to changes in user input in real-time. You can access the new value of the input element through the event object.
*   **Example:**
    ```js
    import React, { useState } from 'react';

    function MyInput() {
      const [inputValue, setInputValue] = useState('');

      const handleChange = (event) => {
        setInputValue(event.target.value);
        console.log('Input value:', event.target.value);
      };

      return (
        <div>
          <input type="text" value={inputValue} onChange={handleChange} />
          <p>You typed: {inputValue}</p>
        </div>
      );
    }

    export default MyInput;
    \`\`\`

## Learn the concept of React Router

*   **Definition:** A library for React that enables navigation between different "pages" or views within a single-page application without requiring full page reloads.
*   **Explanation:** React Router allows you to define different routes (URLs) in your application and associate specific components with those routes. When the user navigates to a different URL (either by clicking a link or programmatically), React Router renders the component associated with that route.
*   **Core Components (React Router v6):**
    *   **`BrowserRouter`:** A router that uses the browser's history API for navigation (uses clean URLs like `/home`). You typically wrap your main application component with this.
    *   **`Routes`:** A component that acts as a container for your individual `Route` definitions. It renders the first `Route` that matches the current URL.
    *   **`Route`:** A component that defines a mapping between a specific URL path and a component that should be rendered when that path matches.
    *   **`Link`:** A component used for creating navigation links. It prevents a full page reload and updates the URL and renders the corresponding route's component.
    *   **`useNavigate`:** (Covered earlier) A Hook for programmatic navigation.
    *   **`useParams`:** A Hook that allows you to access route parameters (dynamic parts of the URL).
*   **Basic Example:**
   ```jsx
    import React from 'react';
    import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

    function Home() {
      return <h2>Home Page</h2>;
    }

    function About() {
      return <h2>About Page</h2>;
    }

    function App() {
      return (
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      );
    }

    export default App;
    ```
    In this example, when the user clicks the "Home" link, the URL changes to `/`, and the `Home` component is rendered. Similarly, clicking "About" changes the URL to `/about` and renders the `About` component, all without a full page reload.






---

### 🤔 What does the second argument in `useEffect` do?

It's the **dependency array**, and it controls **when** the `useEffect` runs.

---

## ✅ 1. **Empty Dependency Array** `[]`

```js
useEffect(() => {
  console.log("Runs only once (on mount)");
}, []);
```

**Behavior:**  
- Runs **once** when the component mounts
- Never runs again
- Commonly used for setup code (e.g. fetch data, start a timer)

---

## ✅ 2. **No Dependency Array**

```js
useEffect(() => {
  console.log("Runs after every render");
});
```

**Behavior:**  
- Runs **after every render** (initial + all updates)
- Be careful! Can lead to performance issues if heavy logic is inside

---

## ✅ 3. **With Dependencies** `[someState, someProp]`

```js
useEffect(() => {
  console.log("Runs on mount + when someState or someProp changes");
}, [someState, someProp]);
```

**Behavior:**
- Runs on **first render**
- Re-runs **whenever one of the dependencies changes**

---

### 🔁 Cleanup Example (with dependency):
```js
useEffect(() => {
  const id = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => clearInterval(id); // cleanup

}, []); // only starts once, cleans up on unmount
```

If you had a dependency inside like `[count]`, the effect would **re-run** every time `count` changes, and the previous interval would be cleared and reset.

---

### ⚠️ Summary

| Dependency Array | Runs When? |
|------------------|------------|
| `[]`             | Once on mount |
| none             | After **every render** |
| `[a, b]`         | On mount + whenever `a` or `b` changes |

---

Let me know if you want to play with examples or get into cleanup, timers, or API calls!





Great! Let’s break down these three React concepts clearly and simply:

---

### ✅ **1. Built-in Components (in React)**

React doesn’t have many "built-in components" like other libraries might. Instead, it gives **primitive building blocks** to create components. However, a few things are often referred to as *built-in components or elements*:

#### Examples:

- `<Fragment>` or `<> </>` – lets you group elements without adding extra nodes to the DOM.
- `<Suspense>` – for lazy loading or waiting for async components/data.
- `<StrictMode>` – highlights potential problems in an app.
- `<Profiler>` – used for measuring performance.

👉 These components are built into React and are used to **control structure, loading, performance**, or **development tools**.

---

### ✅ **2. Why we use `<Fragment>` or `<> </>`**

Normally, in JSX, you can return only **one root element** from a component. But sometimes you want to return multiple elements **without adding extra `<div>`s** to the DOM.

#### Instead of this:
```jsx
return (
  <div>
    <h1>Hello</h1>
    <p>World</p>
  </div>
)
```

#### Use:
```jsx
return (
  <>
    <h1>Hello</h1>
    <p>World</p>
  </>
)
```

### ✅ Why it matters:
- **Avoids extra `<div>` wrappers** that mess up CSS/layout.
- Makes the DOM cleaner.
- Useful inside lists, tables, etc.

---

### ✅ **3. `<Outlet>` (React Router)**

`<Outlet />` is a special component provided by **React Router** for nested routing.

#### Use case:
It tells React Router **where to render child routes** inside a parent layout.

---

#### Example:

```jsx
// App.js
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="home" element={<DashboardHome />} />
  <Route path="settings" element={<DashboardSettings />} />
</Route>
```

```jsx
// DashboardLayout.jsx
function DashboardLayout() {
  return (
    <>
      <Navbar />
      <Outlet />  {/* Child route gets rendered here */}
    </>
  );
}
```

### ✅ Why we use `<Outlet>`:
- Helps in **nesting routes** inside layouts (like headers, sidebars).
- Keeps your layout consistent while switching nested pages.

---

Let me know if you want visual examples or want me to build a tiny working app using `<Outlet>` and fragments!






















































































---

Great! Let’s begin from the top of your list and go step by step:

---

### **1. One-Way Data Binding**

**Definition:**  
One-way data binding means that data flows in one direction — from the parent component to the child component via props. The child cannot directly modify the parent’s state.

**Explanation:**  
React uses one-way data binding to ensure that the UI is always consistent with the underlying data. It improves predictability and debugging.

**Example:**
```jsx
function Parent() {
  const message = "Hello from Parent!";
  return <Child text={message} />;
}

function Child({ text }) {
  return <p>{text}</p>; // Displays "Hello from Parent!"
}
```

In this case, the `Child` receives data via props. It cannot modify the value of `message`.

---


### **2. Conditional Rendering / Dynamic Rendering**

**Definition:**  
Conditional rendering in React allows you to render different UI elements based on certain conditions (like boolean values, state, etc.).

**Explanation:**  
This can be achieved using JavaScript operators like `if`, `ternary operators`, or `&&` for rendering certain parts of the UI conditionally.

**Example:**
```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome Back!</h1> : <h1>Please Log In</h1>}
    </div>
  );
}
```
In this example, `Greeting` component will render either "Welcome Back!" or "Please Log In" depending on the `isLoggedIn` prop.

---

### **3. Controlled vs Uncontrolled Component**

**Definition:**  
- **Controlled Component:** The component’s state is controlled by React (via `useState` or `this.setState`).
- **Uncontrolled Component:** The component’s state is controlled by the DOM, and you use refs to interact with the element directly.

**Explanation:**
- **Controlled Components** are preferred because React manages the state, making it predictable.
- **Uncontrolled Components** allow you to interact with form elements directly without keeping their state in React.

**Example (Controlled Component):**
```jsx
function ControlledInput() {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

**Example (Uncontrolled Component):**
```jsx
function UncontrolledInput() {
  const inputRef = useRef();

  const handleSubmit = () => {
    alert('Input value is: ' + inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

---

### **4. Immutability of State**

**Definition:**  
In React, state is treated as immutable. When you update the state, you should not directly modify it but instead create a new copy with updated values.

**Explanation:**  
Immutability ensures that React can detect changes and re-render components efficiently. It prevents side-effects and makes state transitions predictable.

**Example:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1); // Don't modify `count` directly
  };

  return <button onClick={increment}>Count: {count}</button>;
}
```

---

### **5. Synthetic Events**

**Definition:**  
Synthetic events are React’s cross-browser wrapper around the native DOM events. They normalize event handling across different browsers.

**Explanation:**  
React wraps the native browser events into a synthetic event, which helps handle events in a consistent manner. It also includes methods like `.preventDefault()` and `.stopPropagation()`.

**Example:**
```jsx
function ButtonClick() {
  const handleClick = (event) => {
    alert('Button clicked!');
    event.preventDefault();
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

---

### **6. Pass Data from Child to Parent**

**Definition:**  
To pass data from a child component to a parent component, you need to use a function in the parent passed down as a prop.

**Explanation:**  
In React, data flows from parent to child via props, but if you want to pass data from child to parent, you can use a callback function in the parent and pass it to the child.

**Example:**
```jsx
function Parent() {
  const [message, setMessage] = useState("");

  const handleMessage = (msg) => {
    setMessage(msg);
  };

  return <Child sendMessage={handleMessage} />;
}

function Child({ sendMessage }) {
  return (
    <div>
      <button onClick={() => sendMessage("Hello from Child!")}>
        Send Message to Parent
      </button>
    </div>
  );
}
```

---

### **7. Purpose of Using Spread Operator When Updating (React)**

**Definition:**  
The spread operator (`...`) is used to create a shallow copy of an object or array, allowing you to update specific properties without mutating the original state.

**Explanation:**  
React requires immutability, and using the spread operator helps you create a new state object or array with updated values, which triggers re-rendering.

**Example:**
```jsx
function TodoList() {
  const [todos, setTodos] = useState([{ id: 1, text: "Learn React" }]);

  const updateTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => updateTodo(todo.id, "Updated text")}>
            Update
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

### **8. PropTypes**

**Definition:**  
`PropTypes` is a runtime type-checking feature for React props. It helps ensure that the props passed to a component are of the expected type.

**Explanation:**  
It provides an easy way to validate that the correct type of data is passed to a component, which helps prevent bugs in the application.

**Example:**
```jsx
import PropTypes from 'prop-types';

function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};
```

---

### **9. Hooks, Custom Hooks**

**Definition:**  
- **Hooks** are functions that allow you to "hook into" React state and lifecycle features from function components.
- **Custom Hooks** are user-defined hooks that allow you to reuse stateful logic.

**Explanation:**  
Hooks like `useState`, `useEffect`, `useContext`, etc., are used to manage state, side effects, and context in function components. Custom hooks are built to encapsulate logic that can be shared between multiple components.

**Example (useState Hook):**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

**Example (Custom Hook):**
```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}
```

---

### **10. Rules of Using Hooks / Why Can't Hooks Be Used in Conditions/Branching Statements**

**Definition:**  
Hooks must always be called at the top level of the component or in custom hooks. They should not be called conditionally or inside loops or nested functions.

**Explanation:**  
React relies on the order in which hooks are called to maintain the correct state between renders. If hooks are called conditionally, React cannot guarantee the correct order of execution.

**Example:**
```jsx
function Example() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    const [count, setCount] = useState(0); // Incorrect: hook called conditionally
  }

  return <button onClick={() => setIsLoggedIn(!isLoggedIn)}>Toggle</button>;
}
```

---

### **11. Lifecycle Events in Functional Components / Unmounting in Functional Component (`useEffect` Basics, Cleanup)**

**Definition:**  
Lifecycle events in functional components are handled using the `useEffect` hook, which allows you to perform side effects such as fetching data, subscribing to events, or cleaning up resources when the component unmounts.

**Explanation:**  
- **Mounting**: Runs when the component is added to the DOM.
- **Updating**: Runs when the component state or props change.
- **Unmounting**: Runs when the component is removed from the DOM (cleanup).

**Example:**
```jsx
import { useEffect } from "react";

function Timer() {
  useEffect(() => {
    const timerId = setInterval(() => {
      console.log("Timer running...");
    }, 1000);

    // Cleanup function (unmounting)
    return () => {
      clearInterval(timerId);
      console.log("Timer cleaned up");
    };
  }, []); // Empty dependency array ensures this runs once

  return <div>Timer is running...</div>;
}
```

---


---

### **12. Limitations of Functional Components**

**Definition:**  
Functional components in React have some limitations compared to class components, especially in earlier versions of React. However, with the introduction of hooks, functional components can do almost everything class components can.

**Explanation:**  
Before hooks, functional components did not have built-in state management or lifecycle methods. With hooks, these limitations were lifted, but there are still some nuances:
- Functional components are less optimized when managing more complex state or side effects without hooks.
- No error boundaries in functional components until React 16.8.

**Example (Before hooks, using class components for state management):**
```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return <button onClick={this.increment}>Count: {this.state.count}</button>;
  }
}
```

With hooks, this can now be done in a functional component:
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

---

### **13. Pure Components / Creating a Pure Component / React.memo**

**Definition:**  
- **Pure Components:** A React component that only re-renders when its props or state change.
- **React.memo:** A higher-order component that prevents unnecessary re-renders of functional components.

**Explanation:**  
- **PureComponent** in class components automatically performs a shallow comparison of props and state. It re-renders only if the props or state change.
- `React.memo` in functional components works similarly by memoizing the result of a component's render to avoid re-rendering if the props haven't changed.

**Example (PureComponent):**
```jsx
class PureCounter extends React.PureComponent {
  render() {
    return <button>{this.props.count}</button>;
  }
}
```

**Example (React.memo):**
```jsx
const PureCounter = React.memo(function PureCounter({ count }) {
  return <button>{count}</button>;
});
```

---

### **14. `useRef` (Advantages, Accessing Uncontrolled Elements, Changing/Modifying Value, vs Regular Variable)**

**Definition:**  
`useRef` is a hook in React that returns a mutable object which persists for the lifetime of the component. It is used to access DOM elements directly and store mutable values without causing a re-render.

**Explanation:**  
- `useRef` can store a reference to a DOM element or a mutable value that doesn't trigger re-renders when changed.
- Unlike regular state variables, changes in `useRef` don't cause the component to re-render.

**Example (Accessing DOM Element):**
```jsx
function FocusInput() {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus(); // Focus the input element
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

**Example (Storing a mutable value):**
```jsx
function Timer() {
  const countRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      countRef.current += 1; // Updates ref without re-rendering
      console.log(countRef.current);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>Check the console for count.</div>;
}
```

---

### **15. `useMemo`**

**Definition:**  
`useMemo` is a hook that memoizes the result of a computation, recomputing it only when the dependencies change. This optimizes performance by avoiding expensive re-calculations on every render.

**Explanation:**  
`useMemo` returns a memoized value, which can help optimize performance for expensive calculations. It's similar to `React.memo`, but works on values instead of components.

**Example:**
```jsx
import { useMemo } from "react";

function ExpensiveComputation({ number }) {
  const compute = useMemo(() => {
    return number * 2; // Expensive computation
  }, [number]);

  return <div>Result: {compute}</div>;
}
```

---

### **16. `useMemo` Dependency**

**Definition:**  
`useMemo` accepts a second argument, which is a dependency array. This array tells React when to recompute the memoized value.

**Explanation:**  
`useMemo` only recomputes the result when the values inside the dependency array change. If the dependencies stay the same, the previously memoized value is returned.

**Example:**
```jsx
import { useMemo } from "react";

function ExpensiveComputation({ number }) {
  const compute = useMemo(() => {
    console.log('Computing...');
    return number * 2; // Expensive computation
  }, [number]); // Recomputes only when `number` changes

  return <div>Result: {compute}</div>;
}
```

---

### **17. `useLayoutEffect`**

**Definition:**  
`useLayoutEffect` is similar to `useEffect`, but it fires synchronously after all DOM mutations, ensuring that the DOM is updated before the browser paints the screen.

**Explanation:**  
This hook is useful when you need to measure the DOM before painting, such as for animations or layout adjustments.

**Example:**
```jsx
import { useLayoutEffect, useState } from "react";

function LayoutEffectExample() {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial width
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div>Window width: {width}</div>;
}
```

---

### **18. Render Props**

**Definition:**  
A pattern where a component uses a function as a prop to share dynamic data with a child component.

**Explanation:**  
The component that uses the render prop gives access to data, and the child component can render content based on that data.

**Example:**
```jsx
function MouseTracker({ render }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return render(mousePosition);
}

function App() {
  return (
    <MouseTracker
      render={({ x, y }) => <div>Mouse position: {x}, {y}</div>}
    />
  );
}
```

---

### **19. HOC (Higher-Order Component) / Create Props Proxy for HOC**

**Definition:**  
A **Higher-Order Component (HOC)** is a function that takes a component and returns a new component with additional props or functionality.

**Explanation:**  
HOCs allow code reuse and abstraction. Common examples include `withRouter` in React Router or `connect` in Redux.

**Example (HOC):**
```jsx
function withExtraInfo(Component) {
  return function (props) {
    return <Component {...props} extraInfo="Extra data" />;
  };
}

function DisplayInfo({ extraInfo }) {
  return <div>{extraInfo}</div>;
}

const EnhancedComponent = withExtraInfo(DisplayInfo);
```

---

### **20. `forwardRef`**

**Definition:**  
`forwardRef` is a React function used to pass refs to a child component.

**Explanation:**  
`forwardRef` is useful when you need to forward a ref through a component to one of its children.

**Example:**
```jsx
const Button = React.forwardRef((props, ref) => (
  <button ref={ref} {...props}>
    {props.children}
  </button>
));

const App = () => {
  const buttonRef = useRef();
  
  return <Button ref={buttonRef}>Click me</Button>;
};
```

---

### **21. `dangerouslySetInnerHTML`**

**Definition:**  
`dangerouslySetInnerHTML` is a React property used to set raw HTML content inside an element.

**Explanation:**  
It is called "dangerous" because it can expose your application to cross-site scripting (XSS) attacks if used improperly.

**Example:**
```jsx
function MyComponent() {
  const rawHTML = "<h1>Hello, World!</h1>";

  return <div dangerouslySetInnerHTML={{ __html: rawHTML }} />;
}
```

---

Continuing with the explanations:

---

### **22. React Portals**

**Definition:**  
React portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

**Explanation:**  
Portals are used when you need to render content outside the regular component tree, such as modals or tooltips, without disrupting the rest of the application layout.

**Example:**
```jsx
import { useState } from "react";
import ReactDOM from "react-dom";

function Modal({ onClose }) {
  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
      <div style={{ backgroundColor: "white", margin: "auto", padding: "20px" }}>
        <p>Modal Content</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      {isModalOpen && ReactDOM.createPortal(
        <Modal onClose={() => setIsModalOpen(false)} />,
        document.body
      )}
    </div>
  );
}
```

---

### **23. Error Boundary**

**Definition:**  
An **Error Boundary** is a component that catches JavaScript errors in its child components and logs them, preventing the app from crashing and providing a fallback UI.

**Explanation:**  
Error boundaries use `componentDidCatch` or `static getDerivedStateFromError` to catch errors during rendering, lifecycle methods, and in constructors of the whole tree below them.

**Example:**
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function BuggyComponent() {
  throw new Error("I crashed!");
  return <div>Buggy component</div>;
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}
```

---

### **24. Suspense**

**Definition:**  
**Suspense** is a feature in React for handling asynchronous operations, like code-splitting and data fetching, by showing a fallback UI while waiting for content to load.

**Explanation:**  
Suspense allows components to "wait" for something to finish loading before rendering, such as lazy-loaded components or data from an API. It uses the `fallback` prop to show a loading state while the content is being loaded.

**Example (code-splitting with Suspense):**
```jsx
import React, { Suspense, lazy } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

---

### **25. `useLocation` (Related to React Router, Common in React SPAs)**

**Definition:**  
`useLocation` is a hook from React Router that provides access to the current location object, which represents the current URL in a React Single Page Application (SPA).

**Explanation:**  
You can use `useLocation` to get the current pathname, search, and hash, and it updates whenever the route changes.

**Example:**
```jsx
import { useLocation } from "react-router-dom";

function CurrentPage() {
  const location = useLocation();
  
  return <div>Current pathname is: {location.pathname}</div>;
}
```

---

### **26. React Optimization - Learn More**

**Definition:**  
React Optimization refers to techniques and practices that improve the performance of React applications, such as reducing unnecessary re-renders and optimizing resource loading.

**Explanation:**  
- **React.memo**, **PureComponent**, **useMemo**, and **useCallback** are some tools to optimize rendering.
- Code-splitting and lazy-loading improve loading times.
- **React Profiler** helps identify bottlenecks in the app.

---

### **27. React Profiler**

**Definition:**  
React Profiler is a tool that helps measure the performance of your React application. It shows how many times a component re-renders and how long those renders take.

**Explanation:**  
The profiler can identify components that are rendering more than necessary, allowing developers to focus on optimization.

**Example:**
```jsx
import { Profiler } from "react";

function App() {
  return (
    <Profiler id="App" onRender={(id, phase, actualDuration) => {
      console.log(`Rendered ${id} during ${phase} phase. Took ${actualDuration}ms.`);
    }}>
      <MyComponent />
    </Profiler>
  );
}
```

---

### **28. Drawbacks/Limitations of `useMemo` & `React.memo` / `useCallback`**

**Definition:**  
- **`useMemo`**: Used to memoize expensive computations.
- **`React.memo`**: Memoizes functional components to avoid unnecessary re-renders.
- **`useCallback`**: Memoizes callback functions to prevent unnecessary re-creations of functions.

**Explanation:**  
- **Drawbacks**: These optimizations might introduce unnecessary complexity in the code. For trivial cases, they may even harm performance because of the overhead of memoizing values.
- **When to use**: Use them when dealing with expensive calculations or functions passed to child components that don’t change frequently.

---

### **29. Automatic Batching**

**Definition:**  
Automatic Batching is a feature in React that batches state updates from different events or sources into a single render to improve performance.

**Explanation:**  
Before automatic batching, React would perform a render for each state update. With automatic batching, React collects multiple updates and performs them in a single render cycle.

---

### **30. `ReactDOMClient`**

**Definition:**  
`ReactDOMClient` is the new entry point for React's rendering in React 18 and beyond. It is used to create roots for rendering React components.

**Explanation:**  
It replaces `ReactDOM.render` in earlier versions of React, enabling features like concurrent rendering and Suspense on the server.

**Example:**
```jsx
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

---

### **31. `ReactDOMServer`**

**Definition:**  
`ReactDOMServer` is used for server-side rendering (SSR) of React components, rendering components to static HTML that can be sent to the client.

**Explanation:**  
SSR helps improve performance and SEO by generating the HTML content on the server before sending it to the client.

**Example:**
```jsx
import ReactDOMServer from 'react-dom/server';
import App from './App';

const html = ReactDOMServer.renderToString(<App />);
console.log(html); // Prints static HTML string
```

---

### **32. Diffing Algorithm / How Diffing Algorithm Works**

**Definition:**  
React’s diffing algorithm compares the previous and current virtual DOM to determine the minimum number of changes required to update the real DOM.

**Explanation:**  
React performs a "reconciliation" process, which efficiently updates the real DOM by using a diffing algorithm. It compares the virtual DOM trees and applies the smallest set of changes.

---

### **33. React Fiber**

**Definition:**  
React Fiber is the new reconciliation engine in React 16 and later. It enhances the performance of React's rendering process by allowing asynchronous rendering and incremental updates.

**Explanation:**  
Fiber enables features like concurrent rendering and better error boundaries by splitting rendering work into chunks.

---

### **34. React Concurrent**

**Definition:**  
React Concurrent Mode is a set of new features that help React apps stay responsive and fluid by rendering updates in the background and pausing work when necessary.

**Explanation:**  
It allows React to interrupt rendering work to focus on higher-priority tasks, resulting in smoother user experiences.

---

### **35. Latest Features in React**

**Definition:**  
React's latest features include Concurrent Mode, React Suspense, automatic batching, React Server components, and hooks like `useTransition` and `useDeferredValue`.

---

### **36. How to Prevent Entire Right-Click Events in the React App**

**Definition:**  
Preventing right-click events in React involves intercepting the default behavior of the browser’s context menu.

**Explanation:**  
You can use the `onContextMenu` event to prevent the default right-click menu from appearing.

**Example:**
```jsx
function App() {
  const handleRightClick = (event) => {
    event.preventDefault(); // Prevent the context menu
    alert("Right-click is disabled!");
  };

  return <div onContextMenu={handleRightClick}>Right-click disabled here</div>;
}
```

---

Let’s go through each of your queries in detail:

---

### **When and why do we need `lazy()`?**

**Definition:**  
`React.lazy()` is a function that allows you to load components lazily, i.e., only when they are needed, which helps in reducing the initial load time of your application by splitting the bundle.

**When do we need it?**  
You need `React.lazy()` when:
- You have large components or libraries that you don't need to load initially.
- You want to improve the loading performance of your application, especially for single-page applications (SPA) or large React applications.
- You want to implement **code splitting** and only load certain components when they are required (for example, when navigating to a specific route).

**Why do we need it?**  
It helps to **optimize bundle size** by deferring the loading of components until they are rendered, reducing the time it takes for the application to become interactive initially.

**Example:**
```jsx
import React, { Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

---

### **What is `Suspense`?**

**Definition:**  
**Suspense** is a React component that allows you to declaratively wait for some code (like a lazy-loaded component or a data-fetching operation) to be ready before rendering the component.

**Explanation:**  
It acts as a "boundary" for asynchronous operations and displays a fallback UI (e.g., loading spinner) while waiting for resources like lazy-loaded components or data to be fetched. It helps in showing a loading state in a clean way.

**Example:**
```jsx
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

---

### **Why do we get this error: A component was suspended while responding to `synchronous input`?**

**Error Explanation:**  
This error occurs when a component is trying to "suspend" during the processing of synchronous input (e.g., when a user interacts with the UI, like typing in an input box), and React tries to delay the update to show a loading state. Since this delay occurs during a synchronous event, React interrupts the process and replaces the UI with a loading indicator.

**Why does it happen?**  
When React tries to suspend the component during an event (like a user typing), it conflicts with the immediate nature of input handling. React expects rendering to be synchronous for inputs, so it issues this error to prevent interrupting the user experience.

**How `Suspense` fixes it:**  
React introduced the **`startTransition` API** to wrap updates that cause suspension. When wrapped in `startTransition`, these updates are treated as "low-priority" tasks, and React can wait to process them until the high-priority tasks (like responding to user input) have been handled.

**Example:**
```jsx
import { startTransition, useState } from 'react';

function MyComponent() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    startTransition(() => {
      setValue(e.target.value);  // Suspended updates are wrapped in startTransition
    });
  };

  return <input value={value} onChange={handleChange} />;
}
```

---

### **Advantages and Disadvantages of Using the Code Splitting Pattern (like `lazy()`)**

**Advantages:**
1. **Improved Performance**: By deferring loading of non-critical parts of the application, you can significantly reduce the initial load time.
2. **Better User Experience**: Users can start interacting with the application sooner as less data needs to be loaded upfront.
3. **Optimized Bundle Size**: The final JavaScript bundle is smaller, as only the necessary parts of the app are loaded initially.

**Disadvantages:**
1. **Overhead in Handling Fallbacks**: Implementing Suspense and fallbacks for all components may increase complexity, especially for large applications.
2. **Increased Initial Load Time for Larger Apps**: If you don't manage how you split the code, multiple chunks might get loaded simultaneously, increasing initial loading times.
3. **SEO Concerns**: For server-side rendering (SSR), lazy loading may not be ideal, as content might not be available immediately for search engines to crawl.

---

### **When do we and why do we need `Suspense`?**

**When do we need it?**
- **Lazy Loading**: You need `Suspense` when you're using `React.lazy()` to load components dynamically and want to display a fallback UI while they load.
- **Data Fetching**: With the introduction of Suspense for Data Fetching, you can use it to manage loading states when fetching data from an API.

**Why do we need it?**
- **Simplified Loading States**: It simplifies showing loading states and ensures a better user experience when components or data are not immediately available.
- **Code Splitting**: Helps in implementing code-splitting to load only parts of the application as required, reducing the initial load time.

**Example:**
```jsx
import React, { Suspense, lazy } from 'react';

// Dynamically import the component
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

---

### **What is Prop Drilling?**

**Definition:**  
Prop drilling refers to the process of passing data from a parent component to a deeply nested child component through several layers of intermediate components.

**Explanation:**  
While prop drilling is a simple and effective way to share data between components, it can become cumbersome and hard to maintain as the component tree grows.

**Example:**
```jsx
function Parent() {
  const message = "Hello from Parent!";
  return <Child1 message={message} />;
}

function Child1({ message }) {
  return <Child2 message={message} />;
}

function Child2({ message }) {
  return <div>{message}</div>;
}
```

---

### **What is Lifting State Up?**

**Definition:**  
Lifting state up is the process of moving the state from a child component to a common parent so that the state can be shared among multiple child components.

**Explanation:**  
State should be lifted up when you need to share data between multiple components and ensure they stay in sync.

**Example:**
```jsx
function Parent() {
  const [value, setValue] = useState("");

  return (
    <div>
      <Child1 value={value} />
      <Child2 onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

function Child1({ value }) {
  return <div>{value}</div>;
}

function Child2({ onChange }) {
  return <input type="text" onChange={onChange} />;
}
```

---

### **What are Context Provider and Context Consumer?**

**Definition:**  
- **Context Provider**: A component that provides a value to the component tree.
- **Context Consumer**: A component that consumes and uses the value provided by the Context Provider.

**Explanation:**  
Context allows you to avoid prop drilling by providing a way to share values between components without explicitly passing props through every level of the tree.

**Example:**
```jsx
const MyContext = React.createContext();

function Parent() {
  return (
    <MyContext.Provider value="Hello from context">
      <Child />
    </MyContext.Provider>
  );
}

function Child() {
  return (
    <MyContext.Consumer>
      {(value) => <div>{value}</div>}
    </MyContext.Consumer>
  );
}
```

---

### **If you don't pass a value to the provider, does it take the default value?**

**Definition:**  
If you don't provide a value to a `Context.Provider`, React will use the **default value** provided when the context was created.

**Explanation:**  
The default value is set when creating the context using `React.createContext()`. If a `Provider` is not supplied with a `value`, React will fall back to this default value.

**Example:**
```jsx
const MyContext = React.createContext("Default Value");

function Parent() {
  return (
    <MyContext.Provider>
      <Child />
    </MyContext.Provider>
  );
}

function Child() {
  return (
    <MyContext.Consumer>
      {(value) => <div>{value}</div>} {/* Will display "Default Value" */}
    </MyContext.Consumer>
  );
}
```

---

