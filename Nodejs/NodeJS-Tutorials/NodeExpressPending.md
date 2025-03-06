Okay, let's add interview questions to the Node.js and Express lists, similar to what we did for JavaScript. I'll cover a range of question types, from conceptual understanding to practical coding scenarios.

**Node.js Interview Questions:**

1.  **Node.js architecture:**
    *   *What is Node.js?  What are its key features?*
    *   *Explain the single-threaded, event-driven, non-blocking I/O model of Node.js.*
    *   *What is libuv, and what is its role in Node.js?*
    *   *How does Node.js handle concurrency despite being single-threaded?*
    *   *What are the advantages and disadvantages of Node.js's architecture?*

2.  **HTTP OPTION method:**
    *   *What is the purpose of the HTTP `OPTIONS` method?*
    *   *How does the `OPTIONS` method relate to CORS (Cross-Origin Resource Sharing)?*
    *   *How would you handle an `OPTIONS` request in a Node.js server (both with and without Express)?*

3.  **Router chaining:**
    *   *What is router chaining in Express?  Provide an example.* (This is Express-specific, but often asked in Node.js contexts)
    *   *What are the benefits of using router chaining?*

4.  **Dynamic routing:**
    *   *What is dynamic routing?  Give an example of a dynamic route in Express.*
    *   *How do you access route parameters in Express (e.g., the `:id` in `/users/:id`)?*

5.  **HTTP status codes (100 status code specifically):**
    *   *What are the different categories of HTTP status codes (1xx, 2xx, 3xx, 4xx, 5xx)? Give examples of each.*
    *   *What does the 100 (Continue) status code signify?*
    *   *What does the 200 ok status code signify?*
    *   *What does the 404 status code signify?*
    *   *What does the 500 status code signify?*

6.  **Middleware - practical application:**
    *   *What is middleware in the context of Node.js and Express?*
    *   *Explain the role of `next` in middleware functions.*
    *   *Give examples of common middleware use cases (e.g., logging, authentication, request parsing).*
    *   *Write a simple middleware function that logs the request method and URL for every incoming request.*

7.  **Create middleware to block all GET requests:**
    *   *Write an Express middleware function that blocks all GET requests and sends a 403 (Forbidden) response.* (Coding challenge)

8.  **Event emitter:**
    *   *What is the event emitter pattern in Node.js?*
    *   *How do you create a custom event emitter in Node.js?*
    *   *How do you emit and listen for events? (using `emit` and `on`)*
    *   *What are some practical uses of the event emitter pattern?*

9.  **Reactor pattern:**
      *What is Reactor pattern?*
      *Explain Reactor pattern with example*

10. **Clustering in Node.js:**
    *   *Why is clustering important in Node.js?  How does it help utilize multi-core systems?*
    *   *How does the `cluster` module work in Node.js?*
    *   *Explain the difference between the master process and worker processes in a Node.js cluster.*
    *   *How can worker processes communicate with each other and with the master process?*

11. **`put` vs `post`:**
    *   *What is the difference between the HTTP `PUT` and `POST` methods?*
    *   *When would you use `PUT` instead of `POST`, and vice-versa?*
    *   *Is `PUT` idempotent?  Is `POST` idempotent? Explain.*

12. **`put` vs `patch`:**
    *   *What is the difference between the HTTP `PUT` and `PATCH` methods?*
    *   *When would you use `PATCH` instead of `PUT`?*

13. **Error handling middleware:**
    *   *How does error handling middleware work in Express?  How is it different from regular middleware?*
    *   *What is the signature of an error-handling middleware function (how many arguments does it take)?*
    *   *Write an example of an error-handling middleware function in Express.*

14. **Concurrency:**
      *How can we handle Concurrency?*
      *What is the advantage of concurrency.*

15. **Path module vs URL module:**
    *   *What is the difference between the `path` module and the `url` module in Node.js?*
    *   *Give examples of when you would use each module.*
    *   *How do you join path segments using the `path` module?*
    *   *How do you parse a URL string using the `url` module?*

16. **Middleware to log all parameters:**
    *   *Write an Express middleware function that logs all request parameters (query parameters, body parameters, route parameters) to the console.* (Coding challenge)

17. **Parse URL using URL module:**
    *    *How do you parse a URL string using the `url` module?*

18. **Transform stream:**
     *  *What is Transform stream.*
     *  *Explain with example*

19. **Piping:**
    *   *What is piping in Node.js streams?  Provide an example.*
    *   *What are the benefits of using piping?*

20. **`child_process`:**
    *   *What is the `child_process` module in Node.js used for?*
    *   *What are the different ways to create child processes (e.g., `spawn`, `exec`, `execFile`, `fork`)?*

21. **`fork()`:**
    *   *How does `fork()` work?  How is it different from `spawn()` and `exec()`?*
    *   *How can you communicate between a parent process and a child process created with `fork()`?*

22. **`spawn()`:**
    *   *When would you use `spawn()` instead of `exec()` or `execFile()`?*
    *   *How do you handle the output (stdout, stderr) of a child process created with `spawn()`?*

23. **Built-in level middlewares:**
 * *What are the different built-in middleware functions in Express? (e.g., `express.static`, `express.json`, `express.urlencoded`)*

24. **Query params vs URL params - use cases:**
   *   *What is the difference between query parameters and URL parameters (route parameters)?*
    *   *Give examples of when you would use each type of parameter.*

25. **CommonJS:**
    *   *What is CommonJS?*
    *   *How do you import and export modules using CommonJS syntax (`require` and `module.exports`)?*

26. **Thread vs process:**
    *   *What is the difference between a thread and a process?*
    *   *Does Node.js use multiple threads?  Explain.*

27. **`process.nextTick` vs `setImmediate`:**
    *   *What is the difference between `process.nextTick` and `setImmediate`?*
    *   *In what order will callbacks registered with `process.nextTick`, `setImmediate`, `setTimeout`, and microtasks (like Promise callbacks) be executed?*

28. **Environment variables:**
    *   *What are environment variables?  Why are they useful?*
    *   *How do you access environment variables in Node.js (using `process.env`)?*
    *   *How can you set environment variables?*

29. **Socket:**
    *   *What is a socket?*
    *   *What is WebSockets?*
      *Explain socket programming*

30. **Browser in Node.js:**
    *   *Can we use browser inside Node.js? Explain.*

31. **Localhost:**
     * *Explain localhost*

32. **Structure of HTTP request and response:**
    *   *Describe the general structure of an HTTP request (method, URL, headers, body).*
    *   *Describe the general structure of an HTTP response (status code, headers, body).*

33. **HTTP 403, 500:**
    *   *What does the 403 (Forbidden) status code mean?*
    *   *What does the 500 (Internal Server Error) status code mean?*

34. **CORS, preflight request:**
    *   *What is CORS (Cross-Origin Resource Sharing)?  Why is it important?*
    *   *What is a preflight request?  When does it occur?*
    *   *How do you handle CORS in a Node.js server (both with and without Express)?*

35. **Content negotiation:**
  *    *What is content negotiation in HTTP?*
    *   *How can a client specify its preferred content type using the `Accept` header?*
    *  *How can a server indicate the content type of a response using the `Content-Type` header?*

36. **Cookie headers:**
 * *Explain Cookie headers*

37. **Query params, req.query:**
   *  *How do you access query parameters in Express using `req.query.*?`

38. **Path params, req.params:**
    *   *How do you access route parameters in Express using `req.params.*?`

39. **Changing status code of a response:**
    *   *How do you set the HTTP status code of a response in Express (using `res.status()`)?*

40. **Static files:**
    *   *How do you serve static files (like HTML, CSS, JavaScript, images) in Express (using `express.static`)?*

41. **Cookie storage:**
     *   *How are cookies stored in the browser?*

42. **Browser cache:**
    * *Explain browser cache*

43. **Don't show login page for logged-in users, redirect them to home:**
    *   *How would you implement logic in an Express application to prevent logged-in users from accessing a login page and redirect them to a different route (e.g., a home page)?* (This is a scenario-based question)

44. **Add a 404 page:**
    *   *How would you create a custom 404 page in an Express application?*

45. **`fs.stat`:**
     *   *What is `fs.stat` used for?  What information does it provide?*
    *  *How can you use `fs.stat` to check if a file or directory exists?*

46. **CSRF (Cross-Site Request Forgery):**
    *   *What is CSRF?  How does it work?*
    *   *What are some common techniques to prevent CSRF attacks?*
    *   *How can you implement CSRF protection in a Node.js/Express application (e.g., using the `csurf` middleware)?*

47. **Parts of HTTP request and response:** (Covered in #32)

48. **Write current date and time to a file using FS module:**
    *   *Write a Node.js script that uses the `fs` module to write the current date and time to a text file.* (Coding challenge)

49. **`res.send` vs `res.write`:**
   * *Explain the difference*

50. **`exec` vs `execFile`:**
    *   *What is the difference between `exec` and `execFile` in the `child_process` module?*
    *    *When would you use one over the other?*

51. **Macrotask vs Microtask:**
  *   *Explain the difference between macrotasks and microtasks in the context of the JavaScript event loop.*
    *    *Give examples of macrotasks and microtasks.*
    *    *In what order are macrotasks and microtasks executed?*

52. **Event-driven architecture:**
 * *Explain Event-driven architecture*

53. **Passport authentication:**
    *   *What is Passport.js?  What is its purpose?*
    *   *What are Passport strategies?  Give examples of common strategies.*
     *   *How would you integrate Passport.js into an Express application for user authentication?*

54. **HTTP methods:** (Covered in questions about specific methods like PUT, POST, PATCH, OPTIONS)

55. **Types of streams (duplex stream):**
   *   *What are the different types of streams in Node.js (readable, writable, duplex, transform)?*
    *    *Explain what a duplex stream is and provide an example of when you might use one.*

56. **Node.js core modules:**
 *   *Name some of the core modules in Node.js (e.g., `http`, `fs`, `path`, `url`, `events`, `stream`, `crypto`, `os`).*

57. **`npm install`:**
  *  *What does `npm install` do?*
   *   *What is the difference between `npm install <package>` and `npm install <package> --save` (or `-S`)?*
    *    *What is the difference between `npm install <package> --save` and `npm install <package> --save-dev` (or `-D`)?*
   * *What is `package.json` file.*
    * *What is `package-lock.json`*

58. **CORS policy:** (Covered in #34)

59. **Interceptors:**
    *   *What are interceptors in the context of networking or web development?*
   *   *Give examples of how interceptors can be used (e.g., modifying requests/responses, adding authentication headers, logging).*

60. **Create a server using Node.js:**
    *   *Write a simple Node.js script that creates an HTTP server and listens for requests on a specific port.* (Coding challenge)

61. **`http` module:**
    *    *How do you create an HTTP server using the built-in `http` module in Node.js?*
    *   *How do you handle incoming requests and send responses using the `http` module?*

62. **`fs` module:**
    *   *What are some common operations you can perform using the `fs` (file system) module in Node.js?*
    *  *What is the difference between synchronous and asynchronous file system operations in Node.js? When is it appropriate to use synchronous vs. asynchronous operations?*
     *  *Explain `fs.readFile()` and `fs.writeFile()`*

63. **Modules:**
  *   *How do you create and use modules in Node.js?*
    *   *What is the difference between CommonJS modules (`require`/`module.exports`) and ES modules (`import`/`export`)?*

64. **`app.use`:**
 * *Explain app.use in express*

65. **URL params:** (Covered in #38)

66. **`res.render`:**
    *   *What is `res.render` in Express used for?*
     *   *How do you use `res.render` to render a view template and pass data to it?*

67. **Express-session:**
   *   *What is the `express-session` middleware used for?*
     *   *How do you configure and use `express-session` to manage user sessions?*
   *  *What are some common options for storing session data (e.g., in-memory, database, Redis)?*

68. **All flags in cookies:**
*   *What are some common flags that can be set on cookies (e.g., `HttpOnly`, `Secure`, `SameSite`)?  What is the purpose of each flag?*

69. **View engine:**
 *   *What is a view engine in the context of Express?*
    *   *How do you configure a view engine in an Express application?*
    * *What are the different view engines*

70. **Router middleware:** (Covered in Express section)

71. **Application middleware:** (Covered in #6)

72. **Routing in HTTP server:** (Covered in #60, #61, and Express routing questions)

73. **Application vs router level middleware:**
   *   *What is the difference between application-level middleware and router-level middleware in Express?*

74. **Session cookie working flow:**
  * *Explain session cookie flow*

75. **MVC architecture:**
    *   *What is the Model-View-Controller (MVC) architectural pattern?*
    *   *How can you implement an MVC structure in a Node.js/Express application?*

76. **`res.write` and `res.send` difference:** (Covered in #49)

77. **`app.all`:**
    *   *What does `app.all` do in Express?  How is it different from `app.get`, `app.post`, etc.?*

78. **`app.use(express.json())`:**
    *    *What is the purpose of `app.use(express.json())` in an Express application?*

79. **`.env` file:**
  *   *What is a `.env` file used for?*
    *    *How do you load environment variables from a `.env` file in a Node.js application (e.g., using the `dotenv` package)?*

80. **`writeHeader` vs `setHeader`:**
    *   *What is the difference between `writeHeader` and `setHeader` in the Node.js `http` module?*

81. **Security mechanisms:** (Broad - covered by questions on CSRF, XSS, authentication, etc.)

82. **XSS attacks:**
   *   *What are Cross-Site Scripting (XSS) attacks?  How do they work?*
    *   *What are the different types of XSS attacks (reflected, stored, DOM-based)?*
    *    *How can you prevent XSS attacks in a web application?*

83. **Session and cookie:** (Covered in multiple questions)

84. **Promise and write the data to the file.:**
 * *Write a code using promise for writing data to a file.*

85. **`res.locals`:**
     *   *What is `res.locals` in Express used for?*
     *   *How can you use `res.locals` to pass data to all views rendered during a request?*

86. **`app.locals`:**
* *What is `app.locals`?  How is it different from `res.locals`?*
    *  *What kind of data would you typically store in `app.locals`?*

**Express Interview Questions:**

1.  **`express.json` vs `express.urlencoded`:**
    *   *What is the difference between `express.json()` and `express.urlencoded()` middleware?*
    *   *When would you use each of these middleware functions?*

2.  **Authentication vs authorization:**
    *   *What is the difference between authentication and authorization?*
    *   *Give examples of authentication and authorization mechanisms.*

3.  **Session vs cookies:**
    *    *What is the difference between sessions and cookies?*
    *   *How does session management typically work in a web application?*
    *  *What are the advantages and disadvantages of using cookies for session management?*

4.  **Router level middleware:**
     *   *How do you define router-level middleware in Express?  Provide an example.*
     *   *How is router-level middleware different from application-level middleware?*

5.  **`maxAge` and `Expires` (cookie options):**
    *   *What is the difference between the `maxAge` and `Expires` options when setting cookies in Express?*

6.  **Views:** (Covered in Node.js section - #69)

7.  **`express.urlencoded`:** (Covered in #1)

8.  **`express.set()`:**
    *   *What is `express.set()` used for?  Give some examples of common settings you might configure with `express.set()` (e.g., `view engine`, `views`).*

9.  **Using query params in middleware:** (Covered in Node.js section - #16, #37)

10. **Template partials:**
     *   *What are template partials?  Why are they useful?*
    *   *How do you include a partial in an EJS or Pug template?*

11. **Passing data to templates:**
   *   *How do you pass data from your Express route handlers to your view templates?*

12. **`express.all` vs `express.get`:**
      *What is the difference between `express.all` and `express.get` (or other HTTP method-specific methods)?*

13. **`cookie-parser`:**
  *    *What is the `cookie-parser` middleware used for?*
    *  *How do you access cookies in an Express application after using `cookie-parser`?*

14. **`router.route` - Route chaining:** (Covered in Node.js section - #3)

15. **Dispatch:**
 * *What is Dispatch?*

16. **Express middleware:** (Covered extensively in Node.js section)

17. **Session timeout:**
*How do implement session timeout.*


