```markdown
# Node.js: File System Operations with `fs` and `path`

This document provides a comprehensive guide to reading and writing files in Node.js using the built-in `fs` (File System) and `path` modules.

## The `fs` Module

The `fs` module provides an API for interacting with the file system in a way that is modeled on standard POSIX functions. It offers both synchronous and asynchronous methods for most operations.  *Asynchronous methods are strongly preferred* for most use cases in Node.js, as they don't block the event loop.

### Asynchronous vs. Synchronous

*   **Asynchronous methods:**  Do *not* block the Node.js event loop.  They take a callback function as their last argument, which is called when the operation completes (or an error occurs).  This allows Node.js to continue processing other tasks while the file system operation is in progress.

*   **Synchronous methods:** *Block* the Node.js event loop until the operation completes.  This means that no other code can execute until the file system operation is finished, which can significantly impact performance and responsiveness, especially in server applications. Synchronous methods have names ending in `Sync` (e.g., `readFileSync`, `writeFileSync`).

**Recommendation:** *Almost always use the asynchronous methods* in your Node.js applications, unless you have a very specific reason to use the synchronous versions (e.g., during application startup to load configuration files *before* starting the server).

### Reading Files

#### 1. `fs.readFile(path[, options], callback)` (Asynchronous)

*   **Purpose:** Reads the entire contents of a file asynchronously.
*   **Parameters:**
    *   `path`:  The path to the file (string, Buffer, or URL). Can be relative or absolute.
    *   `options`: (Optional) An object that can include:
        *   `encoding`: (string) The character encoding (e.g., 'utf8', 'ascii', 'base64'). If not specified, the data is returned as a `Buffer` object.
        *   `flag`: (string)  The file system flag (e.g., 'r' for reading, 'w' for writing).  Defaults to 'r'.
    *   `callback`:  A function that's called when the operation completes (or an error occurs).  The callback receives two arguments:
        *   `err`:  An error object if an error occurred, otherwise `null`.
        *   `data`:  The contents of the file (either a string if `encoding` was specified, or a `Buffer` object).

*   **Example:**

    ```javascript
    const fs = require('fs');

    fs.readFile('my-file.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      console.log('File content:', data);
    });
    ```

#### 2. `fs.readFileSync(path[, options])` (Synchronous)

*   **Purpose:** Reads the entire contents of a file *synchronously*. *Blocks* the event loop.
*   **Parameters:**
    *   `path`: The path to the file.
    *   `options`: (Optional) Similar to `fs.readFile`.
*   **Returns:** The contents of the file (string or Buffer).
*   **Example:**
    ```javascript
    const fs = require('fs');

    try {
      const data = fs.readFileSync('my-file.txt', 'utf8');
      console.log('File content:', data);
    } catch (err) {
      console.error('Error reading file:', err);
    }

    ```

#### 3. `fs.promises.readFile(path[, options])` (Promise-based - Asynchronous)

*   **Purpose:**  A promise-based version of `fs.readFile`.  Provides a cleaner way to work with asynchronous file operations using `async/await`.

*   **Example:**

    ```javascript
    const fs = require('fs').promises; // Or: const fs = require('node:fs/promises');

    async function readFileExample() {
      try {
        const data = await fs.readFile('my-file.txt', 'utf8');
        console.log('File content:', data);
      } catch (err) {
        console.error('Error reading file:', err);
      }
    }

    readFileExample();
    ```

### Writing Files

#### 1. `fs.writeFile(file, data[, options], callback)` (Asynchronous)

*   **Purpose:** Writes data to a file asynchronously.  If the file already exists, it will be *overwritten*.
*   **Parameters:**
    *   `file`:  The path to the file.
    *   `data`:  The data to write (string or Buffer).
    *   `options`: (Optional)
        *   `encoding`:  (Default: 'utf8').
        *   `mode`:  (Default: 0o666) File permissions.
        *   `flag`:  (Default: 'w')
    *   `callback`:  Called when the operation completes (or an error occurs).  Receives a single argument:
        *   `err`: An error object if an error occurred, otherwise `null`.

*   **Example:**

    ```javascript
    const fs = require('fs');

    const data = 'This is the data to write to the file.';

    fs.writeFile('output.txt', data, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('File written successfully.');
    });
    ```

#### 2. `fs.writeFileSync(file, data[, options])` (Synchronous)

*   **Purpose:** Writes data to a file *synchronously*.  *Blocks* the event loop.
* **Parameters:**
    * Same as Async `fs.writeFile`

#### 3. `fs.promises.writeFile(file, data[, options])` (Promise-based - Asynchronous)

*   **Purpose:**  A promise-based version of `fs.writeFile`.

*   **Example:**

    ```javascript
    const fs = require('fs').promises;

    async function writeFileExample() {
      try {
        await fs.writeFile('output.txt', 'Hello, promises!', 'utf8');
        console.log('File written successfully.');
      } catch (err) {
        console.error('Error writing file:', err);
      }
    }

    writeFileExample();
    ```

#### 4. `fs.appendFile(path, data[, options], callback)` (Asynchronous)

*    **Purpose:** Appends data to file asynchronously. Creates file if not exists.

#### 5. `fs.appendFileSync(path, data[, options])` (Synchronous)
*    **Purpose:** Appends data to file synchronously. Creates file if not exists. *Blocks* the event loop.

#### 6. `fs.promises.appendFile(path, data[, options])` (Promise-based - Asynchronous)
*    **Purpose:** Promise-based version of `fs.appendFile`.

### Creating Directories

*   **`fs.mkdir(path[, options], callback)` (Asynchronous):** Creates a directory asynchronously.
*   **`fs.mkdirSync(path[, options])` (Synchronous):** Creates a directory synchronously.  *Blocks* the event loop.
*    **`fs.promises.mkdir(path[, options])` (Asynchronous):** Creates a directory asynchronously with Promises.
*   **`options`:**
    *    **`recursive`:**  If `true`, creates parent directories if they don't exist (similar to `mkdir -p`).  *Important: Without `recursive: true`, you'll get an error if you try to create a directory within a non-existent parent directory.*
    *   `mode`: file permission.

    ```javascript
     fs.mkdir('new-directory/nested', { recursive: true }, (err) => { // Creates both new-directory and nested.
        if (err) throw err;
        console.log("Directory created");
    });
    ```

### Deleting Files

*   **`fs.unlink(path, callback)` (Asynchronous):** Deletes a file asynchronously.
*   **`fs.unlinkSync(path)` (Synchronous):** Deletes a file synchronously. *Blocks* the event loop.
*   **`fs.promises.unlink(path)` (Promise-based - Asynchronous)** Deletes a file asynchronously with Promises.

### Checking File Existence and Status

*   **`fs.stat(path[, options], callback)` (Asynchronous):**  Gets information (status) about a file or directory.
*    **`fs.statSync(path[, options])` (Synchronous):** Gets file status synchronously. *Blocks* the event loop.
*   **`fs.promises.stat(path[, options])` (Promise-based - Asynchronous):** Gets file status using Promises
*   **`fs.access(path[, mode], callback)`(Asynchronous):** Test a user's permissions for the file or directory.
*   **`fs.accessSync(path[, mode])` (Synchronous):** Test a user's permissions for the file or directory synchronously. *Blocks* the event loop.
*    **`fs.promises.access(path[, mode])` (Asynchronous):** Test a user's permissions for the file or directory using Promises.
*   **The `callback` for `fs.stat` receives two arguments:**
    *   `err`: An error object if an error occurred.
    *   `stats`:  An `fs.Stats` object containing information about the file:
        *   `stats.isFile()`:  Returns `true` if it's a file.
        *   `stats.isDirectory()`:  Returns `true` if it's a directory.
        *   `stats.size`:  The file size in bytes.
        *   `stats.mtime`:  The last modified time.
        *   `stats.birthtime`: The creation time.
        * And many other properties...
    ```javascript
    fs.stat('my-file.txt', (err, stats) => {
      if (err) {
          if (err.code === 'ENOENT') {
               console.log('file does not exist'); // Check file existance
          }
          else{
              console.error('Error getting file stats:', err);
          }

        return;
      }
      console.log('Is file?', stats.isFile());
      console.log('Is directory?', stats.isDirectory());
      console.log('File size:', stats.size);
    });
    ```

### The `path` Module

The `path` module provides utilities for working with file and directory paths.  It's essential for creating cross-platform compatible code, as it handles differences in path separators (`/` on Linux/macOS, `\` on Windows).

*   **`path.join([...paths])`:** Joins path segments together.  *Always use this instead of manual string concatenation.*

    ```javascript
    const path = require('path');
    const fullPath = path.join(__dirname, 'public', 'css', 'style.css');
    ```

*   **`path.resolve([...paths])`:** Resolves a sequence of paths to an absolute path.

*   **`path.basename(path[, ext])`:** Returns the last portion of a path (the filename).

*   **`path.dirname(path)`:**  Returns the directory name of a path.

*   **`path.extname(path)`:**  Returns the extension of the path.

*   **`path.parse(path)`:** Returns an object whose properties represent significant elements of the path.

* **`__dirname`:** A global variable (in CommonJS modules) that contains the absolute path of the directory containing the currently executing file.

*   **`__filename`:**  A global variable (in CommonJS modules) that contains the absolute path of the currently executing file.

**Complete Example (Putting it all together):**

```javascript
const fs = require('fs').promises; // Use the promise-based API
const path = require('path');

async function processFile(filename) {
  try {
    const filePath = path.join(__dirname, 'data', filename); // Construct absolute path

    // Check if the file exists
     await fs.access(filePath);

    // Read the file
    const data = await fs.readFile(filePath, 'utf8');
    console.log('File content:', data);

    // Create a new directory (if it doesn't exist)
    const outputDir = path.join(__dirname, 'output');
    await fs.mkdir(outputDir, { recursive: true });

    // Write the file content to a new file
    const outputPath = path.join(outputDir, 'output.txt');
    await fs.writeFile(outputPath, data.toUpperCase(), 'utf8');
    console.log('File written to:', outputPath);

      // Append to the file
      await fs.appendFile(outputPath, '\nAppended Text', 'utf8');
      console.log("Text Appended")

      // Get file stats
      const stats = await fs.stat(filePath)
      console.log({stats})

    // Delete the file
    // await fs.unlink(filePath) // Careful

  } catch (err) {
       if (err.code === 'ENOENT') {
          console.log('File does not exist:', err.path); // Best practice, log the path
      }
    console.error('An error occurred:', err);
  }
}

processFile('my-file.txt');

```

This comprehensive guide covers reading and writing files in Node.js, including asynchronous and synchronous methods, the promise-based API, creating and deleting files and directories, checking file existence and status, and using the `path` module for cross-platform path manipulation. It also includes complete, runnable examples and best practices. This is a fundamental skill for any Node.js developer.
```
