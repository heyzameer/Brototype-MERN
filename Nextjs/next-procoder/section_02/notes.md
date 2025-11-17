
---

### 🧭 **File-Based Routing in Next.js**

#### 📂 **1. Folder = Route**

* In Next.js (App Router), **each folder inside the `app/` directory becomes a route**.
* Inside that folder, you must have a `page.js` (or `page.tsx`) file → it defines what is rendered for that route.

  ```
  app/
  ├── page.js          →  '/'
  ├── about/
  │   └── page.js      →  '/about'
  └── contact/
      └── page.js      →  '/contact'
  ```

---

#### 🔗 **2. Navigation Between Pages**

* Use the **`Link` component** from `next/link` for navigation:

  ```jsx
  import Link from "next/link";

  export default function Navbar() {
    return (
      <>
        <Link href="/about">About</Link>
        <Link href="/services/webdev">Web Development</Link>
      </>
    );
  }
  ```
* ✅ `Link` performs **client-side navigation** → *faster, no page reload*
* ❌ Using `<a>` tags causes **full page reloads**

---

#### ⚠️ **3. Folder Naming Rules**

* Folder names are **case-sensitive** (`About` ≠ `about`)
* **Don’t use `./` or relative paths** inside `Link` → always provide **full route path**

  ```jsx
  <Link href="/services/webdev">Go</Link> ✅
  <Link href="./webdev">Go</Link> ❌
  ```

---

#### 🧩 **4. Nested Routes**

* To create nested routes, just **nest folders**:

  ```
  app/
  └── services/
      ├── page.js          → '/services'
      └── webdev/
          └── page.js      → '/services/webdev'
  ```
* Each nested `page.js` represents a deeper route.

---

**💡 Tip:** File-based routing makes navigation simpler — no need for React Router setup; Next.js automatically maps your folders to URLs.

---





---

### 🧩 **Dynamic Routes, Params & Search Params in Next.js**

#### ⚙️ **1. Dynamic Routes**

* In Next.js, you can create **dynamic routes** using **square brackets** in folder names.
  Example:

  ```
  app/
  └── blog/
      └── [blog]/
          └── page.js
  ```
* Here, `[blog]` is a **dynamic segment** — it can take any value like `/blog/nextjs`, `/blog/react`, etc.
* The value inside `[]` becomes a **key** in the `params` object.

---

#### 🧠 **2. Accessing Route Params**

* You can get route parameters in the page component using **async functions** and destructuring:

  ```jsx
  import React from 'react';

  const page = async ({ params }) => {
    console.log(await params);     // { blog: "nextjs" }
    const { blog } = await params;

    return (
      <div>
        <h1>Welcome to Blog {blog} page!</h1>
      </div>
    );
  };

  export default page;
  ```
* Here:

  * The folder name `[blog]` becomes the **key**
  * The URL value `/blog/nextjs` becomes the **value**

---

#### 🔍 **3. Search Params (Query Strings)**

* For URL queries like:
  `/blog?category=tech&author=zameer`
* Access them using `searchParams`:

  ```jsx
  const page = async ({ searchParams }) => {
    const { category, author } = await searchParams;
    console.log(category, author);
  };
  ```
* Useful for **filters**, **sorting**, or **search queries**.

---

#### ⚡ **4. Summary**

| Feature         | Description                                        | Example                          |
| --------------- | -------------------------------------------------- | -------------------------------- |
| `params`        | Dynamic path value                                 | `/blog/[blog]` → `/blog/react`   |
| `searchParams`  | Query string data                                  | `/blog?category=tech`            |
| **async/await** | Needed because params may come from server context | `const { blog } = await params;` |

---








---

## 🧭 **Dynamic Nested Routes in Next.js**

### ⚙️ **1. What Are Nested Dynamic Routes?**

* A **nested dynamic route** means you have **dynamic segments inside multiple folders**, forming **multi-level routes**.
* Example:

  ```
  /blog/[category]/[postId]
  ```

  → `/blog/tech/nextjs-setup`
  → `/blog/travel/paris-trip`

Each `[ ]` folder acts as a **placeholder** for dynamic data passed via the URL.

---

### 📂 **2. Folder Structure Example**

```
app/
└── blog/
    └── [category]/
        └── [postId]/
            └── page.js
```

This structure automatically creates routes like:

* `/blog/tech/123`
* `/blog/science/456`

---

### 🧠 **3. Accessing Params in Nested Dynamic Routes**

You can access **all dynamic values** via the `params` object provided by Next.js:

```jsx
import React from "react";

const page = async ({ params }) => {
  console.log(await params);
  // Example output: { category: "tech", postId: "123" }

  const { category, postId } = await params;

  return (
    <div>
      <h1>Category: {category}</h1>
      <h2>Post ID: {postId}</h2>
    </div>
  );
};

export default page;
```

✅ **Key Points:**

* You can use `async` and `await` since params come from the **server**.
* You can destructure multiple parameters directly from `params`.
* The folder names (`[category]`, `[postId]`) define the keys automatically.

---

### 🔍 **4. Example Use Case**

Suppose you’re building a blog app:

| Route                 | Description                     |
| --------------------- | ------------------------------- |
| `/blog/tech/101`      | Tech category, post ID 101      |
| `/blog/lifestyle/202` | Lifestyle category, post ID 202 |

These can dynamically display different posts based on the URL — no need to hard-code pages.

---

### 🧩 **5. Combining with Search Params**

You can also use **query parameters** with nested routes:

```
/blog/tech/101?author=zameer&featured=true
```

```jsx
const page = async ({ params, searchParams }) => {
  const { category, postId } = await params;
  const { author, featured } = await searchParams;
  console.log(category, postId, author, featured);
};
```

---

### ⚡ **6. Real Flow**

1. User visits `/blog/tech/nextjs`
2. Next.js reads folders → `[category]` = `tech`, `[postId]` = `nextjs`
3. These values are passed as **`params`**
4. You can use them to **fetch dynamic data** (e.g., from MongoDB or API)

   ```jsx
   const data = await fetch(`https://api.site.com/${category}/${postId}`);
   ```
5. Page renders server-side with correct content.

---

### 💡 **7. Summary**

| Concept                  | Description                                  |
| ------------------------ | -------------------------------------------- |
| **Dynamic Route**        | Uses `[param]` syntax                        |
| **Nested Dynamic Route** | Multiple `[param]` folders inside each other |
| **Access Params**        | `params` object in the page function         |
| **Use Case**             | Blogs, product details, user profiles, etc.  |
| **Advantage**            | Flexible, no need to manually define routes  |

---













---

## 🕸️ **Catch-All Routes in Next.js**

### ⚙️ **1. What Is a Catch-All Route?**

* A **catch-all route** lets you handle **multiple path segments** dynamically under one route file.
* It captures **any number of segments** that come after a certain path.

---

### 📂 **2. Syntax**

Use **triple dots inside brackets**:

```
[...slug]
```

Example folder:

```
app/
└── docs/
    └── [...slug]/
        └── page.js
```

This matches:

* `/docs`
* `/docs/setup`
* `/docs/setup/nextjs`
* `/docs/setup/nextjs/install`

👉 All of these routes will point to the same `page.js`.

---

### 🧠 **3. Accessing the Params**

Inside the page, use the `params` object to access all segments as an **array**:

```jsx
import React from "react";

const page = async ({ params }) => {
  console.log(await params);
  const { slug } = await params;
  return (
    <div>
      <h1>Catch-All Route Example</h1>
      <p>Path segments: {slug?.join(" / ")}</p>
    </div>
  );
};

export default page;
```

If the URL is `/docs/setup/nextjs/install`,
`params.slug` → `["setup", "nextjs", "install"]`

---

### 🧩 **4. Optional Catch-All Route**

If you want the route to also work **without any segment**, use:

```
[[...slug]]
```

Example:

```
app/
└── blog/
    └── [[...slug]]/
        └── page.js
```

This matches:

* `/blog`
* `/blog/post1`
* `/blog/2025/nextjs`

✅ `params.slug` will be:

* `undefined` → when path is `/blog`
* `["post1"]` → when `/blog/post1`

---

### ⚡ **5. When to Use**

* For **documentation pages** (`/docs/...`)
* For **deeply nested blog routes** (`/blog/category/post`)
* For **dynamic breadcrumbs or navigation**
* For **handling unknown paths gracefully**

---

### 💡 **6. Summary Table**

| Type                   | Syntax        | Description                    |
| ---------------------- | ------------- | ------------------------------ |
| **Dynamic Route**      | `[slug]`      | One segment only               |
| **Catch-All Route**    | `[...slug]`   | Multiple segments (required)   |
| **Optional Catch-All** | `[[...slug]]` | Works with or without segments |

---














---

## 🧭 **Required vs Optional Catch-All Routes in Next.js**

### ⚙️ **1. Required Catch-All Route**

* Defined using:

  ```
  [...slug]
  ```
* Means the path **must include at least one segment** after the base route.
* If no segment is provided, the route **will not match**.

#### 📂 Example:

```
app/
└── docs/
    └── [...slug]/
        └── page.js
```

✅ Works for:

* `/docs/setup`
* `/docs/setup/nextjs/install`

❌ Does **not** work for:

* `/docs` → will show 404

#### 🧠 `params.slug` output:

* `/docs/setup/nextjs` → `["setup", "nextjs"]`

---

### ⚙️ **2. Optional Catch-All Route**

* Defined using:

  ```
  [[...slug]]
  ```
* Means the path **can have zero or more segments**.
* Works even if the base path has **no additional segments**.

#### 📂 Example:

```
app/
└── blog/
    └── [[...slug]]/
        └── page.js
```

✅ Works for:

* `/blog`
* `/blog/post1`
* `/blog/2025/nextjs`

#### 🧠 `params.slug` output:

* `/blog` → `undefined`
* `/blog/post1` → `["post1"]`
* `/blog/2025/nextjs` → `["2025", "nextjs"]`

---

### ⚡ **3. Key Difference**

| Feature              | **Required Catch-All `[...slug]`**     | **Optional Catch-All `[[...slug]]`**           |
| -------------------- | -------------------------------------- | ---------------------------------------------- |
| **Minimum segments** | At least **1** required                | Can be **0 or more**                           |
| **Base path works?** | ❌ No (`/docs` → 404)                   | ✅ Yes (`/blog` works)                          |
| **When to use**      | Deep routes that always have sub-paths | Flexible routes (like blogs, docs, categories) |

---

### 💡 **Quick Tip**

Use `[[...slug]]` when you want the **base page and subpages** to share the same component logic.
Use `[...slug]` when sub-routes are **mandatory** for that page to exist.

we cannot use optional catch all route in the root

---














---

# ✅ **1. What is a Layout in Next.js?**

A layout is a **UI wrapper** that surrounds your pages.

For example: **Header + Page Content + Footer**

```
<Header />
{children}
<Footer />
```

Layouts automatically wrap all routes **inside the same folder**.

---

# ✅ **2. Default App Layout (Global Layout)**

`app/layout.js`

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>Global Header</header>

        {children}

        <footer>Global Footer</footer>
      </body>
    </html>
  );
}
```

This header and footer will appear on **all pages** unless overridden.

---

# ✅ **3. Add Header & Footer to Every Page**

Just put them inside `app/layout.js` as shown above.

---

# ✅ **4. Custom Layout for a Specific Folder (Nested Layout)**

Example folder structure:

```
app/
   dashboard/
      layout.js      <-- Custom layout for dashboard pages only
      page.js
      settings/
         page.js
```

`app/dashboard/layout.js`

```jsx
export default function DashboardLayout({ children }) {
  return (
    <section>
      <nav>Dashboard Sidebar</nav>

      <div>{children}</div>
    </section>
  );
}
```

✔ Only pages inside `/dashboard/*` will use this layout
✔ Global layout still wraps this layout

---

# ✅ **5. Custom Layout for a Specific Page Only**

### ❌ Next.js does NOT support layout.js per single page

BUT…

### ✔ You can create a layout for a single page using a **folder wrapper**.

Example: You want a custom layout only for `/profile`.

Create a folder:

```
app/profile/
    layout.js     <-- layout only for profile page
    page.js
```

`app/profile/layout.js`

```jsx
export default function ProfileLayout({ children }) {
  return (
    <div>
      <header>Profile Header</header>

      {children}

      <footer>Profile Footer</footer>
    </div>
  );
}
```

✔ Only `profile/page.js` uses this layout
✔ Other pages remain unchanged

---

# ✅ **6. Change Header or Footer Only for One Page**

Example:
You want to **remove footer** only on `/login`.

```
app/login/
   layout.js
   page.js
```

`app/login/layout.js`

```jsx
export default function LoginLayout({ children }) {
  return (
    <div className="login-wrapper">
      {/* No header */}
      {children}
      {/* No footer */}
    </div>
  );
}
```

✔ You have full control: add or remove anything

---

# ✅ **7. Sharing Multiple Components Like Navbar/Footer**

Best folder structure:

```
components/
   Header.jsx
   Footer.jsx
   Sidebar.jsx

app/
   layout.js
   dashboard/layout.js
   profile/layout.js
```

`app/layout.js`

```jsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
```

---

# 🎯 **8. Summary (Super Simple)**

| Feature                            | Explanation                                        |
| ---------------------------------- | -------------------------------------------------- |
| **Global Layout**                  | `app/layout.js` (header/footer for entire website) |
| **Nested Layout**                  | create `layout.js` inside any folder               |
| **Page-Specific Layout**           | wrap that page inside a folder and add `layout.js` |
| **Remove or edit header/footer**   | create custom layout for that specific folder      |
| **Layouts auto-wrap child routes** | no need to import manually                         |

---
















# ⭐ **Next.js Metadata — Simple Notes**

Next.js has a built-in way to set **SEO metadata** for every page using:

* `metadata` object
* and the `generateMetadata` function

Works inside **page.js** or **layout.js**.

---

# ✅ 1. **Basic Custom Metadata**

Inside `page.js`:

```jsx
export const metadata = {
  title: "Home Page",
  description: "Welcome to my website!",
};
```

✔ Sets custom title
✔ Sets description

---

# ✅ 2. **Using Templates for Dynamic Title**

You can create a pattern for all page titles using **template** and **%s**.

Example in `layout.js`:

```jsx
export const metadata = {
  title: {
    template: "%s | MyWebsite",
    default: "MyWebsite",
  },
};
```

### How it works:

* If page title = `"About"`,
  → final title = **"About | MyWebsite"**
* If page has no title,
  → `"MyWebsite"`

✔ `%s` = replaced by page title
✔ Used for consistent branding

---

# ✅ 3. **Setting Metadata in Child Pages Using Template**

`about/page.js`

```jsx
export const metadata = {
  title: "About Us",
};
```

Final title becomes:

```
About Us | MyWebsite
```

---

# ✅ 4. **Absolute URLs (VERY IMPORTANT for SEO)**

Some metadata fields **must be absolute URLs**, not relative.

For example:

### Open Graph (Social Sharing)

```jsx
export const metadata = {
  openGraph: {
    title: "Blog Post",
    description: "This is a blog post",
    url: "https://mywebsite.com/blog/post-1",
    images: [
      {
        url: "https://mywebsite.com/images/blog-cover.png",
      },
    ],
  },
};
```

✔ Must use full URL
✔ Good for previews on WhatsApp, LinkedIn, Twitter

---

# ✅ 5. **Setting Metadata Dynamically (generateMetadata)**

Used for dynamic pages like blog:

```jsx
export async function generateMetadata({ params }) {
  return {
    title: `Blog: ${params.slug}`,
    description: "Blog details",
  };
}
```

If slug = `nextjs-tutorial`, title becomes:

```
Blog: nextjs-tutorial | MyWebsite
```

(because of template)

---

# 🎯 Summary (Super Short)

* **metadata object** → set static metadata
* **template: "%s | SiteName"** → auto title formatting
* **%s** → replaced by child page title
* **absolute URLs** → required for `openGraph`, `twitter`, `url`, and images
* **generateMetadata** → dynamic metadata for pages like blog

---






---

## 📝 Notes on Custom **Not Found** Pages in Next.js

### **1. Creating a Custom `not-found` Page**

* In Next.js (App Router), you can create a file named **`not-found.js`** inside a route folder.
* This file acts like a **custom 404 page for that specific route**.
* Example:

  ```
  app/dashboard/not-found.js   → shown only when /dashboard routes fail
  ```
* This makes the “Not Found” page **unique for each route**, instead of having one global 404 for the whole app.

---

### **2. Why `not-found.js` Doesn’t Receive Params**

* Unlike normal page components, a `not-found.js` file **does not get `params` as props**.
* Next.js does this because a 404 page isn't tied to a valid route — so there are no route parameters to pass.
* Example:
  Even if `/product/123` doesn’t exist, the `not-found` page **won’t** receive `123` as a param.

---

### **3. Making the Component “Client-Side”**

* If you want to use hooks like `usePathname()`, the component must be a **Client Component**.
* Add:

  ```js
  "use client";
  ```

  at the top of the `not-found.js`.

---

### **4. Using `usePathname()` to Get the Current URL**

* Since `not-found.js` doesn’t get params, but you may want to show **which URL failed**, you can use:

  ```js
  import { usePathname } from "next/navigation";
  ```
* Inside the component:

  ```js
  const pathname = usePathname();
  ```
* This gives you the **exact URL** the user tried to access, which you can display in your custom 404 UI.

---









---

## 📝 Notes on **Route Groups** in Next.js

### **1. What Are Route Groups?**

* Route Groups let you **organize your folder structure** in the App Router **without affecting the actual URL**.
* You create a group by wrapping a folder name in parentheses:

  ```
  app/(admin)/dashboard/page.js
  ```
* Even though the folder is named `(admin)`, the URL still becomes:

  ```
  /dashboard
  ```
* So it helps structure your code **purely for organization**, not routing.

---

### **2. Why Route Groups Are Useful**

You use them when you want:

* Separate layout structures
  → Example: one layout for admin, one for user
* Clean folder organization
* To avoid long nested URLs caused by deep folder structures
* To apply different **layouts**, **loading**, **error**, or **not-found** files to specific sections

---

### **3. Layout Control With Route Groups**

* A layout inside a Route Group **applies only to the routes inside that group**.
* Example:

  ```
  app/(marketing)/layout.js → applies to marketing pages
  app/(dashboard)/layout.js → applies to dashboard pages
  ```
* This lets you build completely different UI shells for different parts of your app.

---

### **4. Route Groups Don’t Affect the URL**

* Super important:
  Whatever you put inside parentheses **never appears** in the URL.
* Example:

  ```
  app/(auth)/login/page.js → /login
  ```

---

### **5. Combining Groups With Nested Routes**

* You can combine normal folders + route groups to keep your structure flexible.
* Example:

  ```
  app/(user)/profile/page.js        → /profile
  app/(user)/settings/page.js       → /settings
  app/(public)/home/page.js         → /home
  ```

---









---

## 📝 Notes on **Private Folders & `_` Convention** in Next.js

### **1. What Is a Private Folder in Next.js?**

* In the Next.js App Router, any folder that **starts with an underscore** (`_`) is treated as a **private folder**.
* Example:

  ```
  app/_utils/
  app/_components/
  ```
* These folders are **NOT treated as routes**, meaning:

  * They don’t create pages.
  * They don’t generate URLs.
  * They are ignored by the routing system.

---

### **2. Why Private Folders Are Useful**

You use them for:

* Storing shared components
* Utility functions
* UI elements that are not pages
* Reusable server or client components
* Organizing project files without polluting your routes

This keeps your `app/` folder clean and avoids accidental route creation.

---

### **3. Using `%5F` for Underscore in URLs**

* Since `_` folders are **ignored** by routing, sometimes you may want a page that literally includes an underscore in the URL.
* But Next.js blocks folders starting with `_` from becoming routes.
* To bypass this limitation, you can URL-encode the underscore.

#### **How to do it:**

* Use `%5F` (URL encoded underscore) as the folder name:

  ```
  app/%5Fprofile/page.js
  ```
* This generates a route like:

  ```
  /_profile
  ```
* So `%5F` = `_` in URL encoding, which allows underscore routes **without abusing the private folder convention**.

---

### **4. Summary**

* `_folder` → private, ignored by router
* `%5Ffolder` → treated as a route, appears as `_folder` in the URL
* Use private folders for internal project organization
* Use `%5F` only when you **intentionally** need an underscore in your URL

---


