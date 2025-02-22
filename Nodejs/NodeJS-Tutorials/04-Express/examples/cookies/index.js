
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// --- Middleware ---

app.use(express.json()); // Parse JSON request bodies (if you need it)
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cookieParser('mysecret')); // Secret for signed cookies

// pp.use(express.json());: This middleware is used to parse incoming requests with JSON payloads. It makes the parsed JSON data available in req.body. This is essential if your client-side code is sending data using fetch or axios with a Content-Type: application/json header.

// app.use(express.urlencoded({ extended: true }));: This middleware is used to parse incoming requests with URL-encoded payloads. This is the format typically used by HTML forms without file uploads (i.e., forms that don't have enctype="multipart/form-data"). It makes the parsed form data available in req.body. The extended: true option allows for parsing complex objects and arrays within the form data.

// When to Use Which:

// express.json(): Use this when your client is sending data as JSON. This is common in modern web applications using frameworks like React, Vue, or Angular, where data is often sent via AJAX requests using fetch or axios.

// express.urlencoded(): Use this when your client is sending data from a standard HTML form without file uploads.

// Both: You can, and often should, use both middleware. This allows your server to handle requests with either JSON or URL-encoded bodies. It makes your API more flexible. The order doesn't usually matter between these two, but it's good practice to put them before your route handlers.

// --- Simple "User" Data (for demonstration) ---

const validUser = {
    username: 'testuser',
    password: 'testpassword'
};

// --- Routes ---

// Login Form (and Display Logged-In Status)
app.get('/', (req, res) => {
    // Check for the loggedIn cookie
    if (req.signedCookies.loggedIn === 'true' && req.signedCookies.username) {
        res.send(`
            <h1>Welcome, ${req.signedCookies.username}!</h1>
            <p>You are logged in.</p>
            <a href="/logout">Logout</a>
        `);
    } else {
        res.send(`
            <h1>Login</h1>
            <form action="/login" method="post">
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username"><br>
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password"><br><br>
                <input type="submit" value="Login">
            </form>
        `);
    }
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === validUser.username && password === validUser.password) {
        // Successful login: Set cookies

        // Set loggedIn cookie (signed for security)
        res.cookie('loggedIn', 'true', {
            maxAge: 1000 * 60 * 60, // Cookie lasts for 1 hour (adjust as needed)
            signed: true,  // Sign the cookie
            httpOnly: true // Important for security
        });

        // Set username cookie (also signed)
        res.cookie('username', username, {
            maxAge: 1000 * 60 * 60, // Same duration as loggedIn
            signed: true,
            httpOnly: true
        });

        res.redirect('/'); // Redirect to the home page
    } else {
        res.send('Invalid username or password.');
    }
});

// Logout Endpoint
app.get('/logout', (req, res) => {
    // Clear the cookies
    res.clearCookie('loggedIn');
    res.clearCookie('username');
    res.redirect('/'); // Redirect to the home page
});

// --- Start Server ---

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// ```

// Key Changes and Explanations:

// *   **No `express-session`:**  We've completely removed `express-session`.  The entire authentication state is now managed through cookies.
// *   **`cookieParser` is Essential:**  We *must* use `cookieParser` to handle setting, reading, and clearing cookies. We use it with a secret (`'mysecret'`) to create *signed* cookies.
// *   **Signed Cookies:**  We use `signed: true` when setting both the `loggedIn` and `username` cookies.  This is crucial for security.  Signed cookies are protected against tampering on the client-side.
// *   **`httpOnly`:**  We use `httpOnly: true` for both cookies.  This prevents client-side JavaScript from accessing the cookies, mitigating XSS attacks.
// *   **Login (`/login`):**
//     *   Upon successful login, we set *two* cookies:
//         *   `loggedIn`:  Set to `'true'` (as a string).  This acts as a flag indicating that the user is logged in.
//         *   `username`:  Stores the user's username.
//     *   Both cookies are set with `maxAge`, `signed`, and `httpOnly` options.
// *   **Checking Login Status (`/`):**
//     *   Instead of checking `req.session`, we now check `req.signedCookies.loggedIn` and `req.signedCookies.username`.  We use `req.signedCookies` because we created signed cookies.
//     *   We check if `loggedIn` is equal to the string `'true'`.
// *   **Logout (`/logout`):**
//     *   We use `res.clearCookie()` to remove *both* the `loggedIn` and `username` cookies.  This effectively logs the user out.

// **How it Works (Cookies Only):**

// 1.  **User visits `/`:**
//     *   The server checks for the `loggedIn` and `username` cookies (using `req.signedCookies`).
//     *   If both cookies exist and `loggedIn` is `'true'`, the user is considered logged in, and the welcome message is shown.
//     *   Otherwise, the login form is shown.

// 2.  **User logs in (`/login`):**
//     *   The server checks the username/password.
//     *   If correct, the server sets the `loggedIn` and `username` cookies (signed and with `httpOnly`).  The `maxAge` determines how long these cookies will last in the user's browser.
//     *   The user is redirected to `/`.

// 3.  **User visits other pages (or revisits `/`):**
//     *   The browser sends the `loggedIn` and `username` cookies with each request.
//     *   The server checks these cookies (using `req.signedCookies`) to determine if the user is logged in and to retrieve their username.

// 4.  **User logs out (`/logout`):**
//     *   The server clears the `loggedIn` and `username` cookies using `res.clearCookie()`.
//     *   The user is redirected to `/`, and they will see the login form again.
// 5. **User closes the browser:** Since we set the cookie with a `maxAge`, it *will* persist across browser restarts, *until* `maxAge` is reached.

// **Important Considerations (Cookies Only vs. Sessions):**

// *   **Security:**  Storing authentication state *solely* in cookies is generally *less secure* than using sessions.  Even with signed and `httpOnly` cookies, there are potential vulnerabilities.  For example, if an attacker obtains the cookies (e.g., through a network interception), they could impersonate the user.
// *   **Data Size:** Cookies have a limited size (around 4KB).  Sessions are stored on the server, so they can hold much more data.  In this simple example, we're only storing a small amount of data (loggedIn status and username), so cookies are sufficient.  But for more complex applications, sessions are usually preferred.
// *   **Server Load:** With cookie-based authentication, the server doesn't need to maintain any session state in memory or a database.  This can reduce server load, especially with a large number of users.  However, the security trade-offs often outweigh this benefit.
// * **Expiration:** With cookie alone you control the expiration time when you set it.

// **In summary:** While this example demonstrates how to implement authentication using *only* cookies, it's generally recommended to use sessions (`express-session`) for most web applications due to their enhanced security and flexibility. Cookies are better suited for storing small amounts of non-sensitive data or for "remember me" functionality *in conjunction with* sessions. This example is valuable for understanding the underlying mechanisms, but for production use, sessions are the preferred approach.
