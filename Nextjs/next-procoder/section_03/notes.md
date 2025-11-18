
---

## 📝 **Rendering Paradigms Supported by Next.js**

Next.js supports **multiple rendering strategies**, letting you choose how and when your UI is generated.

---

# **1. CSR — Client-Side Rendering**

### **What it is**

* The page is rendered **in the browser** using JavaScript.
* Next.js sends **minimal HTML** + a JavaScript bundle.
* The browser downloads JS → React runs → UI appears.

### **When it happens**

* When you use:

  * `"use client"` components
  * Browser-only hooks: `useState`, `useEffect`, `usePathname`
  * Client interactivity

### **Best for**

* Interactive UI
* State-heavy components
* Real-time dashboards
* UI that changes AFTER initial load

---

# **2. SSR — Server-Side Rendering**

### **What it is**

* The page is rendered **on the server** at request time.
* Next.js sends ready-made **HTML** to the browser.
* Browser then hydrates the HTML using JS.

### **How Next.js triggers SSR**

* Using **Dynamic Rendering** features:

  * `fetch()` with `{ cache: "no-store" }`
  * `fetch()` inside a Server Component with dynamic variables
  * `cookies()` or `headers()` inside the page
  * Dynamic route handlers

### **Best for**

* Data that changes on every request
* Authentication-protected pages
* Personalized dashboards

---

# **3. RSC — React Server Components (Default in Next.js 13+)**

### **What it is**

* Components rendered **on the server**, but instead of HTML → they output an **RSC payload**.
* The RSC payload is a **serialized description** of the React component tree.
* The browser uses React to **reconstruct the UI without sending big JS bundles**.

### **Benefits**

* Smaller bundle size
* Faster page load
* Heavy logic runs on server
* Zero JS shipped unless needed

### **When it happens**

* Any file **without** `"use client"`

---

# **4. HTML Rendering (Static or Dynamic)**

### **Static HTML:**

* Built at build time (`npm run build`)
* Served from CDN
* Super fast
* Happens when:

  * No dynamic data
  * Only Server Components
  * `fetch()` uses default caching (`cache: "force-cache"`)

### **Dynamic HTML:**

* HTML built **when requested**
* Happens when:

  * You use `no-store`, `cookies()`, or `headers()`
  * You need SSR

---

# **5. Building a Page With RSC Payload**

### **Process**

1. Server renders React Server Components
2. Generates an **RSC payload** instead of plain HTML
3. Client React uses this payload to reconstruct UI
4. Only client components ship JS

### **Result**

* Faster + smaller download
* Only interactive components hydrate

---

# 🥊 **CSR vs SSR — Deep But Simple Comparison**

## **CSR**

| Feature            | CSR                         |
| ------------------ | --------------------------- |
| Rendering happens  | In the browser              |
| First content load | Slow (blank until JS loads) |
| SEO                | Weak (HTML empty at first)  |
| JS bundle          | Large                       |
| Interactivity      | High                        |
| Use cases          | Dashboards, forms, SPAs     |

---

## **SSR**

| Feature            | SSR                                    |
| ------------------ | -------------------------------------- |
| Rendering happens  | On the server                          |
| First content load | Fast (HTML already built)              |
| SEO                | Strong                                 |
| JS bundle          | Smaller than CSR                       |
| Interactivity      | Added after hydration                  |
| Use cases          | Blogs, e-commerce, authenticated pages |

---

# **CSR vs SSR — Core Difference**

### **CSR**

Browser does all the work 👉 Render UI

### **SSR**

Server does all the work 👉 Sends finished UI

---









---

# 📝 **Static vs Dynamic Rendering in Next.js**

## **1. Static Rendering**

* In Static Rendering, pages are **built once during the build step** (`next build`).
* The output is **pre-generated HTML + RSC payload** stored on the server or CDN.
* These pages do **not run again** on every request.
* Used when:

  * Data is not changing often
  * Page can be cached
  * Better performance is needed

### **Key idea:**

**Static pages run only during the build.**

---

## **2. Dynamic Rendering**

* Dynamic Rendering means the page is **re-rendered on the server every time a user requests it**.
* Next.js re-executes:

  * Server Components
  * Data fetching
  * RSC generation
  * HTML generation
* Used when:

  * Data changes frequently
  * User-specific data required
  * Auth flows depend on cookies/headers

### **Triggers dynamic rendering:**

* Dynamic routes (e.g., `/product/[id]`)
* Using:

  ```js
  fetch(..., { cache: "no-store" })
  ```
* Using:

  ```js
  cookies(), headers()
  ```
* Uncached data from databases or APIs

### **Key idea:**

**Dynamic pages run every time on the server.**

---

# 📝 **Dynamic Routes Automatically → Dynamic Rendering**

* When you have folders like:

  ```
  app/blog/[slug]/page.js
  ```
* Next.js cannot pre-build infinite/slugs by default.
* So they are treated as **dynamic** and re-rendered per request.

---

# 📝 **CSR + SSR Run Together (Hybrid Rendering)**

In Next.js App Router:

### 👉 **Next.js uses both CSR and SSR automatically**

* The server creates **RSC payload** (Server Component data)
* The client receives:

  * HTML (from SSR or static)
  * RSC payload (serialized React tree)
  * JS for client components

### What Next.js looks at:

* It detects what type of components exist inside the page

  * Server Components (default)
  * Client Components (`"use client"`)

### RSC payload sent with:

```
Content-Type: text/x-component
```

This indicates **React Server Component stream**.

---

# 📝 **What Is the RSC Payload? (Simple Explanation)**

The **RSC payload** is:

### ❗A special serialized format that describes the React Server Component tree.

### It contains:

* Component structure
* Props
* Data fetched on the server
* Instructions for the browser on how to assemble the UI
* References to client components that need hydration

### It does **NOT** contain:

* Full HTML
* JavaScript bundles
* CSS

### Why it matters:

* It makes pages fast because:

  * Server Components run on the server
  * Client receives a **lightweight payload**
  * Only client components get hydrated (less JS sent)

### Think of it like:

> “A blueprint of the UI”
> sent from the server to the browser
> instead of sending full HTML or full JS.

That's why Next.js can mix:

* SSR (HTML)
* CSR (Client components)
* RSC (Server Components)

All together on one page.

---










---

# 📝 **SSG vs Non-SSG in Next.js**

## **1. SSG — Static Site Generation**

SSG means the page is **pre-rendered at build time**.

### **How it works**

* Next.js runs the Server Components during `next build`
* The output becomes:

  * **Static HTML**
  * **Static RSC payload**
* Stored on CDN → served instantly on request

### **When SSG happens**

A page becomes SSG when:

* It has **no dynamic data**
* Or it uses `fetch()` with **default caching**:

  ```js
  fetch(url) // default: cache: "force-cache"
  ```
* Or you define `generateStaticParams()` in a dynamic route

### **Key idea:**

**SSG = Build once → Reuse for all users.**

---

## **2. Non-SSG (Dynamic Rendering)**

Non-SSG = the page **cannot be pre-rendered** and must be rendered on **every request**.

### **Triggers dynamic rendering**

* Using:

  ```js
  fetch(..., { cache: "no-store" })
  ```
* Using:

  ```js
  cookies(), headers()
  ```
* Using `searchParams`
* DB queries with request-specific data
* Dynamic routes with no `generateStaticParams()` defined

### **Key idea:**

**Non-SSG = Re-render on every request.**

---

# 📝 **`generateStaticParams()` — What It Does**

`generateStaticParams()` is used in **dynamic routes** to turn them into SSG pages.

### **Why needed?**

Dynamic routes like:

```
app/product/[id]/page.js
```

cannot be pre-built unless Next.js knows **which IDs** exist.

### **What generateStaticParams does**

* Returns an array of all possible route params
* Next.js builds static pages for each one at build time

### **Example**

```js
export async function generateStaticParams() {
  const products = await fetch("https://api.example.com/products")
    .then(res => res.json());

  return products.map(product => ({
    id: product.id.toString(),
  }));
}
```

Now Next.js will statically build:

```
/product/1
/product/2
/product/3
...
```

### **Result**

* These pages become **SSG**
* Super fast
* No server execution on request

---

# 📝 **When to Use `generateStaticParams`**

Use it when:

* You have a dynamic route
* The number of paths is known (or reasonably small)
* Data rarely changes

Examples:

* Blog posts
* Product pages
* Documentation pages
* Category pages

---

# 📝 **Summary**

| Concept                    | Meaning                                              |
| -------------------------- | ---------------------------------------------------- |
| **SSG**                    | Page pre-rendered at build time                      |
| **Non-SSG**                | Page rendered on every request (dynamic)             |
| **generateStaticParams()** | Pre-generates paths → Converts dynamic routes to SSG |

---











---

# 📝 **Dynamic Pages + `generateStaticParams` + `dynamicParams` in Next.js**

## **1. How Dynamic Pages Work in Next.js**

Dynamic pages look like:

```
app/blog/[slug]/page.js
```

Next.js doesn’t know all possible slugs unless you tell it.

So by default:

* If the user visits a new slug (not generated at build time),
  👉 **Next.js will try to generate it on-demand** (at request time).
* This means dynamic routes can create **new pages after build**.

---

# 📝 **2. Using `generateStaticParams()` to Pre-Build Dynamic Pages**

When you define `generateStaticParams()`, Next.js:

* Fetches all possible params during build
* Generates static HTML + RSC payload for them

Example:

```js
export async function generateStaticParams() {
  return [
    { slug: "nextjs" },
    { slug: "react" },
  ];
}
```

Build will include:

```
/blog/nextjs
/blog/react
```

---

# 📝 **3. What Happens When a New Param is Requested?**

Example:
`/blog/angular` (not included in generateStaticParams)

By **default**, Next.js will:

* Treat this as a dynamic, not static, request
* Try to render this page **at request time**
* (This is called **fallback rendering / on-demand rendering**)

So Next.js still allows unknown slugs.

---

# 📝 **4. Stop Dynamic Generation: `dynamicParams = false`**

If you want to PREVENT Next.js from generating unknown routes, add:

```js
export const dynamicParams = false;
```

### What this does:

❌ No more on-demand rendering
❌ No generating new pages when unknown params are visited
❌ No fallback behavior

### Result:

* Only slugs returned by `generateStaticParams()` are valid
* Any other slug → **404 Not Found**

This is useful when:

* You have a fixed set of pages
* You want strict control
* You don’t want users accessing arbitrary URLs

---

# 📝 **Summary Table**

| Feature                  | Behavior                                          |
| ------------------------ | ------------------------------------------------- |
| `generateStaticParams()` | Pre-builds pages during build                     |
| Without `dynamicParams`  | Unknown params → generated dynamically at request |
| `dynamicParams = false`  | Unknown params → **404**, no fallback             |

---












---

# 📝 **ISR (Incremental Static Regeneration)**

## **1. What Is ISR?**

ISR allows Next.js to **re-build static pages *after* the build**, without needing a full deploy again.

### In simple words:

> **The page is static, but it refreshes automatically after a time interval.**

So you get:

* Speed of static pages
* Freshness of dynamic data

---

# 📝 **2. How ISR Works**

ISR uses a **revalidation timer**.

### Flow:

1. User visits page → Next.js serves the **old static page** instantly
2. In the background, after X seconds, Next.js regenerates the page
3. Next visitor gets the **new updated version**

This background regeneration makes it “incremental.”

---

# 📝 **3. Using `revalidate` inside a Page or Layout**

Add this at the top of your Server Component:

```js
export const revalidate = 10; 
```

Meaning:

* Regenerate the page every **10 seconds**
* Until then, serve cached static content

---

# 📝 **4. Using ISR with `fetch()` — `{ next: { revalidate } }`**

Next.js allows ISR inside data fetching:

```js
fetch("https://api.example.com/data", {
  next: { revalidate: 5 }
});
```

### Meaning:

* Cache the API response
* Re-fetch fresh data **every 5 seconds**
* Rebuild the RSC payload automatically

### Important:

This **does not** force SSR.
It still keeps the page *static*, but refreshes the data at intervals.

---

# 📝 **5. ISG vs ISR**

You mentioned **ISG** — it’s the same concept but older terminology.

### Old Next.js (pages router):

* ISR was also called **ISG** (Incremental Static Generation)

### New Next.js (app router):

* It's simply called **ISR** with `revalidate`.

Both mean:

> Static + background regeneration

---

# 📝 **6. Summary Table**

| Feature                       | Meaning                                               |
| ----------------------------- | ----------------------------------------------------- |
| **ISR**                       | Static page updated periodically in background        |
| `revalidate: X` (file level)  | Rebuild page every X seconds                          |
| `{ next: { revalidate: X } }` | Refetch data & regenerate RSC payload every X seconds |
| Without revalidate            | Page = fully static, never updates                    |
| `revalidate: 0`               | Page behaves like SSR                                 |

---










---

# 📝 **Dynamically Rendering Static Pages in Next.js**

Next.js normally tries to decide automatically whether a page should be **static** or **dynamic**.

But sometimes **you need to override this behavior manually**.

Next.js gives you special exports to control it:

```js
export const dynamic = "auto"          // default
export const dynamic = "force-dynamic"
export const dynamic = "force-static"
export const dynamic = "error"
```

Let’s break them down.

---

# 🧠 **1. `dynamic = "auto"` (Default Behavior)**

This is the default.

### Next.js checks your code and decides:

* If page has no dynamic code → **static**
* If page uses cookies, headers, searchParams → **dynamic**

### Example:

```js
export const dynamic = "auto";
```

### When used:

* You want Next.js to choose automatically.
* Normal behavior.

---

# ⚡ **2. `dynamic = "force-dynamic"`**

Forces page to **ALWAYS render dynamically on every request**.

### Meaning:

* Never cached
* Never built as static
* Runs server functions on every request
* Same as SSR behavior

### Example:

```js
export const dynamic = "force-dynamic";
```

### Use when:

* Using searchParams every request
* Using cookies you need fresh
* Personalized content required

---

# 🧊 **3. `dynamic = "force-static"`**

Forces the page to be **static no matter what**.

### Meaning:

* Runs **only during build**
* Even if you use `cookies()` or `searchParams` (NOT recommended), it tries static

### Example:

```js
export const dynamic = "force-static";
```

### Use when:

* You want strict static generation
* No dynamic features needed
* You want maximum cache/performance

---

# 🚫 **4. `dynamic = "error"`**

Throws an error if Next.js detects anything dynamic.

### Meaning:

* If code contains cookies(), searchParams, headers, or no-store fetch → ❌ error
* Ensures page stays **fully static and pure**

### Example:

```js
export const dynamic = "error";
```

### Use when:

* You want to guarantee NO dynamic rendering
* Useful for documentation pages, blog posts, etc.

---

# 📝 **Example From Your Code**

```js
const Services = async ({ searchParams }) => {
  const myCookies = await cookies();
  console.log(myCookies);
};
```

### Key Notes:

* Using `cookies()` **forces dynamic rendering**
* Using `searchParams` also **forces dynamic**
* So Next.js auto-switches this page to **dynamic**

But you can override it using one of these:

```js
export const dynamic = "auto";          // default
export const dynamic = "force-dynamic"; // force SSR
export const dynamic = "force-static";  // force SSG
export const dynamic = "error";         // error if dynamic detected
```

---

# 🧩 **Summary Table**

| Setting             | Behavior                                |
| ------------------- | --------------------------------------- |
| **"auto"**          | Next.js decides static or dynamic       |
| **"force-dynamic"** | Always SSR, run every request           |
| **"force-static"**  | Always SSG, static regardless of code   |
| **"error"**         | Throw error if dynamic code is detected |

---

