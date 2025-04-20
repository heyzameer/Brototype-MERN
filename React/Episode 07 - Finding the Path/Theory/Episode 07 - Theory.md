## Namaste React Course by Akshay Saini

# Episode 07 - Finding the Path

## Q: What are various ways to `add images` into our App? Explain with `code examples`.

A: Using the `full URL of the image` for the web (CDN) or any public images.
Example :

```
<img src="https://reactjs.org/logo-og.png" alt="React Image" />
```

Adding the image into the project
`Drag your image into your project` and `import it` into the desired component

```
import reactLogo from "./reactLogo.png";
export default function App() {
  return <img src={reactLogo} alt="react logo" />
}
```

The correct way to structure images in your project is to add them in an `images` folder. If you are using other `assets` than just images, you might want to add all in the `assets` folders.

```
import reactLogo from "../../assets/images/reactLogo.png";
export default function App() {
  return <img src={reactLogo} alt="react logo" />
}
```

## Q: What would happen if we do `console.log(useState())`?

A: If we do `console.log(useState())`, we get an array `[undefined, function]` where first item in an array is `state` is `undefined` and the second item in an array is `setState` `function` is bound dispatchSetState.

## Q: How will `useEffect` behave if we `don't add` a `dependency array`?

A: Syntax of `useEffect` is:

```
useEffect(() => {}, []);
```

Case 1 : When the `dependency array is not included` in the arguments of `useEffect() hook`, the callback function will be executed `every time` the component is rendered and re-rendered.

```
useEffect(() => {
	console.log("I run everytime this component rerenders")
});
```

Case 2 : When the `dependency array is empty` in the arguments of `useEffect() hook`, the callback function will be executed `only one time` during the initial render of the component.

```
useEffect(() => {
	console.log("I Only run once (When the component gets mounted)")
}, []);
```

Case 3 : When the `dependency array contains a condition`, the callback function will be executed `one time` during the initial render of the component and also rerender if there is a `change in the condition`.

```
useEffect(() => {
	console.log("I run every-time when my condition changed")
}, [condition]);
```

## Q: What is `SPA`?

A: `Single Page Application (SPA)` is a web application that dynamically updates the webpage with data from web server without reloading/refreshing the entire page. All the HTML, CSS, JS are retrieved in the initial load and other data/resources can be loaded dynamically whenever required. An SPA is sometimes referred to as a `single-page interface (SPI)`.

## Q: What is the difference between `Client Side Routing` and `Server Side Routing`?

A: In `Server-side routing or rendering (SSR)`, every change in URL, http request is made to server to fetch the webpage, and replace the current webpage with the older one.

In `Client-side routing or rendering (CSR)`, during the first load, the webapp is loaded from server to client, after which whenever there is a change in URL, the router library navigates the user to the new page without sending any request to backend. All `Single Page Applications uses client-side routing`.



Absolutely! Here's a **detailed breakdown** of all those core `react-router-dom` concepts, with explanations, syntax, examples, and when to use them.

---

## 🔰 `react-router-dom`
`react-router-dom` is the standard routing library for React. It enables **client-side routing** — which means your app can navigate between pages **without refreshing the whole page**.

---

## 🛠️ `createBrowserRouter`

### 📌 What it does:
`createBrowserRouter()` is used to define your **routes** in a structured way using the **Browser History API** (so you get real URLs like `/about`, `/contact`, etc.).

### ✅ Syntax:
```js
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
]);
```

### 🧠 Why use it:
It gives you a flexible way to configure not just top-level routes but also **nested routes** and **error boundaries**.

---

## 📦 `RouterProvider`

### 📌 What it does:
You wrap your app with `RouterProvider` and pass it the router created using `createBrowserRouter`.

### ✅ Syntax:
```js
import { RouterProvider } from "react-router-dom";

<RouterProvider router={router} />
```

### 🧠 Why use it:
It makes routing information available to your components via React context (so you can use hooks like `useParams`, `useNavigate`, etc.).

---

## 🔗 `<Link>` vs `<a>`

| Feature      | `<Link>` (React Router)     | `<a>` (HTML anchor tag)         |
|--------------|------------------------------|----------------------------------|
| Page reload  | ❌ No (uses JS navigation)     | ✅ Yes (reloads whole page)       |
| SPA routing  | ✅ Works with React Router     | ❌ Breaks SPA routing             |
| Performance  | ✅ Faster                      | ❌ Slower due to full reload      |

### ✅ Use `<Link>` like this:
```jsx
import { Link } from "react-router-dom";

<Link to="/about">About</Link>
```

### ❌ Avoid this in React apps:
```jsx
<a href="/about">About</a>  // Causes full page reload
```

---

## 🧩 `<Outlet />`

### 📌 What it does:
`<Outlet />` is a **placeholder** used in layouts (like `AppLayout`) where **child routes** will render.

### ✅ Example:
```jsx
// AppLayout.jsx
return (
  <>
    <Header />
    <Outlet /> {/* This is where child components render */}
    <Footer />
  </>
);

// Route structure:
{
  path: '/',
  element: <AppLayout />,
  children: [
    { path: 'about', element: <About /> },
    { path: 'contact', element: <Contact /> }
  ]
}
```

When you go to `/about`, the `About` component will render **inside the `<Outlet />`**, between Header and Footer.

---

## 🧭 `useParams()`

### 📌 What it does:
`useParams()` gives you **dynamic parameters** from the URL.

### ✅ Example:
```jsx
<Route path="/restaurant/:resId" element={<Restaurant />} />
```

In your `Restaurant.jsx`:
```js
import { useParams } from "react-router-dom";

const { resId } = useParams();
console.log(resId); // e.g., "123" if URL is /restaurant/123
```

Use this to fetch data or display info based on the URL.

---

## 📍 `useLocation()`

### 📌 What it does:
`useLocation()` returns information about the **current location (URL)**, including path, search params, hash, and state.

### ✅ Example:
```js
import { useLocation } from "react-router-dom";

const location = useLocation();

console.log(location.pathname); // e.g. "/restaurant/425"
console.log(location.search);   // e.g. "?q=pizza"
console.log(location.state);    // e.g. { userId: 42 }
```

### 🧠 Use Cases:
- Access **search queries** like `?search=burger`
- Access **custom state** passed with `<Link to={{ pathname: "/xyz", state: { userId: 1 } }}>`

---

## 📌 Quick Summary Table

| Concept            | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `createBrowserRouter()` | Sets up route config using modern React Router v6                      |
| `RouterProvider`   | Injects router into app (wrap your whole app)                               |
| `<Link>`           | SPA-friendly navigation between routes                                      |
| `<Outlet>`         | Renders child routes inside parent layout                                   |
| `useParams()`      | Access route parameters like `:id`                                          |
| `useLocation()`    | Access the current URL, search params, state, etc.                          |

---

Ah, looks like you're trying to use a hook like `useRoute`, but here's the thing:

> ❌ **There is no `useRoute()` hook in `react-router-dom`**.

---

### ✅ Valid React Router hooks include:

| Hook              | Purpose                                                                 |
|-------------------|-------------------------------------------------------------------------|
| `useParams()`     | Get URL params like `/restaurant/:id`                                   |
| `useLocation()`   | Get current location info (path, query string, state, etc.)             |
| `useNavigate()`   | Programmatically navigate to a route                                    |
| `useOutlet()`     | Access the child element rendered inside an `<Outlet />`                |
| `useLoaderData()` | (Advanced - data routers) Access loader data defined in route config    |
| `useMatches()`    | Get info about all matched routes                                       |

---

### 🔍 Common Mistake:

If you wrote something like this:
```js
import { useRoute } from 'react-router-dom';
```

That will throw an error because `useRoute` **doesn't exist**.

---

### ✅ What to use instead?

If you're trying to:

- Get route **params** like an `id` → use `useParams()`
- Know what the current route is → use `useLocation()`
- Navigate programmatically → use `useNavigate()`

---

