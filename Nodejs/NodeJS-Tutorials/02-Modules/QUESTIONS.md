# CommonJS (CJS) vs. ES Modules (ESM): Detailed Comparison

This document provides a comprehensive comparison between CommonJS (CJS) and ES Modules (ESM), two module systems in JavaScript.

## Concise Comparison Table

| Feature                      | CommonJS (CJS)                                   | ES Modules (ESM)                                     |
|------------------------------|---------------------------------------------------|-----------------------------------------------------|
| **Default Environment**        | Node.js (Older)                                   | Modern JavaScript (Browsers + Node.js)               |
| **Importing**               | `const math = require('./math');`               | `import { add } from './math.js';`                |
| **Exporting**               | `module.exports = { add, subtract };`          | `export function add(a, b) {}`                   |
| **Loading/Execution**        | Synchronously (blocking)                       | Asynchronously (non-blocking in browsers)         |
| **File Extension**          | `.js` (default)                                    | `.mjs` or `"type": "module"` in `package.json`        |
| **Browser Support**           | ❌ No (requires bundler)                            | ✅ Yes (native `<script type="module">`)                 |
| **Dynamic Imports**           | ✅ Supported via `require()`                        | ✅ `import()` (promise-based)                        |
| **Static Analysis**           | ❌ Limited                                         | ✅ Supports tree shaking                               |
| **Strict Mode**             | Optional (`"use strict";` required)               | Always enabled                                       |

## Key Differences Explained

### Syntax & Usage

*   **CJS:** Uses `require()` for importing modules and `module.exports` for exporting values from a module.

    ```javascript
    // moduleA.js (CJS)
    function myFunction() {
      return "Hello from moduleA!";
    }

    module.exports = myFunction;

    // main.js (CJS)
    const moduleA = require('./moduleA');
    console.log(moduleA()); // Output: Hello from moduleA!
    ```

*   **ESM:** Uses `import` and `export`, with support for both named and default exports.  Offers more flexible and explicit control over what is imported and exported.

    ```javascript
    // moduleB.js (ESM)
    export function myFunction() {
      return "Hello from moduleB!";
    }

    // main.js (ESM)
    import { myFunction } from './moduleB.js';
    console.log(myFunction()); // Output: Hello from moduleB!
    ```

### Execution & Performance

*   **CJS:** Loads modules synchronously. This means that when `require()` is called, the execution of the current file pauses until the required module is loaded and executed.

*   **ESM:** Loads modules asynchronously in browsers by default. This allows the browser to continue parsing and rendering the page while modules are being fetched, improving performance. In Node.js, asynchronous loading can be achieved with dynamic imports.

### Browser vs. Node.js

*   **CJS:** Primarily designed for Node.js environments. It is *not* natively supported in web browsers and requires a module bundler (e.g., Webpack, Parcel, Rollup) for browser compatibility.

*   **ESM:** Natively supported in modern web browsers using the `<script type="module">` tag.  Also supported in Node.js, requiring the `.mjs` extension or `"type": "module"` in `package.json`.

### Static Analysis & Tree Shaking

*   **CJS:** Presents challenges for static analysis due to its dynamic nature. This makes it difficult for bundlers to determine which parts of a module are actually being used, potentially leading to larger bundle sizes.

*   **ESM:** Facilitates static analysis. This allows tools like module bundlers to perform *tree shaking*, which is the process of removing unused code from your modules, resulting in smaller bundle sizes and improved performance.

### Strict Mode

*   **CJS:** Does not automatically enforce strict mode.  You must explicitly enable strict mode by adding the `"use strict";` directive at the beginning of the file or within a function.

*   **ESM:** Always runs in strict mode by default. This enforces stricter parsing and error handling, preventing common JavaScript mistakes.

### Node.js Compatibility

*   **CJS:** The default module system in Node.js.  Uses `.js` file extensions by default.

*   **ESM:**  To enable ES Modules in Node.js:
    *   Use the `.mjs` file extension for module files (e.g., `myModule.mjs`).
    *   Or, add `"type": "module"` to your `package.json` file.
    *   in script tags in HTML files, use `<script type="module" src="myModule.js"></script>`.

This tells Node.js to treat those files as ES Modules.

