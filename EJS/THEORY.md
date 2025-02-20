```markdown
# Node.js: EJS (Embedded JavaScript) Templating

This document covers EJS (Embedded JavaScript), a popular templating engine for Node.js, focusing on its use with Express.js for server-side rendering.

## 47. EJS

### a. What is EJS?

*   **Definition:** EJS (Embedded JavaScript) is a simple templating language that lets you generate HTML markup with plain JavaScript.  It's commonly used with Express.js for server-side rendering (SSR).

*   **Key Features:**
    *   **Embedded JavaScript:**  You can embed JavaScript code directly within your HTML templates.
    *   **Data Injection:**  Easily pass data from your Node.js server to your templates.
    *   **Control Flow:**  Use JavaScript control flow statements (if/else, loops) within your templates.
    *   **Partials:**  Include reusable template fragments (e.g., headers, footers).
    *   **Simple Syntax:**  Uses familiar HTML syntax with special tags for embedding JavaScript.
    * **Easy to Learn**: EJS is easy to learn for those with basic HTML and JavaScript knowledge.

### b. Server-Side Rendering (SSR)

*   **Definition:**  SSR is a technique where the server generates the HTML for a web page and sends it to the client (browser).  The browser then renders the complete HTML, rather than having to wait for JavaScript to execute and build the page.

*   **Benefits of SSR:**
    *   **Improved SEO:**  Search engine crawlers can easily index the content of fully rendered HTML pages.
    *   **Faster Initial Load:**  Users see the content faster, as the browser doesn't have to wait for JavaScript to execute.
    *   **Better Performance on Low-Powered Devices:**  Reduces the load on the client's CPU and memory.

*   **Contrast with Client-Side Rendering (CSR):**  In CSR, the server sends a minimal HTML page with JavaScript, and the JavaScript is responsible for building the entire page content in the browser.  SPAs (Single Page Applications) often use CSR.

### c. `view engine`

*   **Purpose:**  In Express.js, the `view engine` setting specifies the default templating engine to use for rendering views.

*   **Setting the View Engine:**

    ```javascript
    const express = require('express');
    const app = express();

    app.set('view engine', 'ejs'); // Set EJS as the view engine
    ```

*   **Views Directory:** By default, Express looks for view files in a directory named `views` in your application's root directory. You can change this using:

    ```javascript
    app.set('views', './my-views'); // Set the views directory to './my-views'
    ```

### d. `render()`

*   **`res.render(view [, locals], [callback])`:**  The core method for rendering a view template in Express.
    *   `view`:  The name of the view file (without the `.ejs` extension, if you've set the `view engine`).
    *   `locals`:  An object containing data that will be passed to the view.  This data is available within the template.
    *   `callback`:  An optional callback function.  If provided, the rendered HTML is passed to the callback instead of being sent directly as the response.

*   **Example:**

    ```javascript
    // app.js
    const express = require('express');
    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', './views');

    app.get('/', (req, res) => {
      const data = {
        name: 'World',
        users: ['Alice', 'Bob', 'Charlie']
      };
      res.render('home', data); // Render the 'views/home.ejs' template
    });

    app.listen(3000);
    ```

### e. EJS Tags

EJS uses special tags to embed JavaScript code within HTML templates:

*   **`<% %>` (Scriptlet Tag):**  Executes JavaScript code *without* outputting anything to the rendered HTML.  Used for control flow (if/else, loops) and variable declarations.

    ```html
    <% if (user) { %>
      <p>Welcome, <%= user.name %>!</p>
    <% } else { %>
      <p>Please log in.</p>
    <% } %>
    ```

*   **`<%= %>` (Output Tag):**  Outputs the *escaped* value of a JavaScript expression.  Escaping prevents cross-site scripting (XSS) vulnerabilities by converting characters like `<`, `>`, and `&` into their HTML entities (`&lt;`, `&gt;`, `&amp;`).

    ```html
    <p>The current time is: <%= new Date() %></p>
    ```

*   **`<%- %>` (Unescaped Output Tag):**  Outputs the *raw, unescaped* value of a JavaScript expression.  *Be extremely careful* when using this tag, as it can introduce XSS vulnerabilities if you're outputting user-provided data.  Only use it when you *know* the data is safe (e.g., when outputting HTML that you've generated yourself).

    ```html
    <%- '<p>This HTML will be rendered.</p>' %>
    ```

*   **`<%# %>` (Comment Tag):** Adds comments, not rendered to HTML.

    ```html
        <%# This is a comment %>
    ```
* **`-%>` (Whitespace Slurping Tag):** Removes all the whitespace.

    ```html
    <% if (list.length) { -%>
        <ul>
            <% list.forEach(item => {-%>
                <li><%= item %></li>
            <% }) -%>
        </ul>
    <% } -%>
    ```
* **`<%%` and `%%>`: (Literal Tag)**
    ```html
    <%%- This is how you escape the "minus" in the unescaped output tag %>
    ```

### f. Partials

*   **Definition:** Partials are reusable template fragments that can be included in other templates.  They're useful for things like headers, footers, navigation menus, and other common elements.

*   **Creating a Partial:** Create a separate EJS file for your partial (e.g., `views/partials/header.ejs`).

    ```html
    <!-- views/partials/header.ejs -->
    <header>
      <h1>My Website</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>
    ```

*   **Including a Partial:** Use the `include()` function within another template. The path is relative to current file, or you can set with `app.set('views', path)`

    ```html
    <!-- views/home.ejs -->
    <!DOCTYPE html>
    <html>
    <head>
      <title>Home Page</title>
    </head>
    <body>
      <%- include('partials/header') %>  <!-- Include the header partial -->

      <main>
        <p>Welcome to the home page!</p>
      </main>

      <%- include('partials/footer') %> <!-- Include the footer partial -->
    </body>
    </html>
    ```

    ```html
    <!-- views/partials/footer.ejs -->
    <footer>
      <p>&copy; 2023 My Website</p>
    </footer>
    ```

*   **Passing Data to Partials:** You can pass data to a partial as the second argument to `include()`:

    ```html
    <%- include('partials/user', { user: currentUser }) %>
    ```

    ```html
    <!-- views/partials/user.ejs -->
    <p>Logged in as: <%= user.name %></p>
    ```

*   **Example:  Complete EJS Setup**

    ```javascript
    // app.js
    const express = require('express');
    const app = express();
    const path = require('path');

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views')); // Use path.join for cross-platform compatibility

    app.get('/', (req, res) => {
      res.render('home', { title: 'Home Page', message: 'Welcome!' });
    });

    app.get('/about', (req, res) => {
      res.render('about', { title: 'About Page' });
    });

    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
    ```

    ```html
    <!-- views/home.ejs -->
    <!DOCTYPE html>
    <html>
    <head>
      <title><%= title %></title>
    </head>
    <body>
      <%- include('partials/header') %>
      <h1><%= message %></h1>
      <%- include('partials/footer') %>
    </body>
    </html>
    ```

    ```html
    <!-- views/about.ejs -->
    <!DOCTYPE html>
    <html>
    <head>
      <title><%= title %></title>
    </head>
    <body>
       <%- include('partials/header') %>
      <h1>About Us</h1>
      <p>This is the about page.</p>
       <%- include('partials/footer') %>
    </body>
    </html>
    ```

    ```html
    <!-- views/partials/header.ejs -->
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>
    ```

    ```html
    <!-- views/partials/footer.ejs -->
    <footer>
      <p>&copy; 2023 My Website</p>
    </footer>
    ```

    **Directory structure**

```
your-project/
├── app.js
├── views/
│   ├── home.ejs
│   ├── about.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
└── package.json
```
This comprehensive guide covers EJS templating in Node.js, including its syntax, server-side rendering, using the `view engine` and `render()` methods in Express, different EJS tags, and creating and using partials.  This provides a strong foundation for building dynamic web pages with EJS and Express.js.
```
