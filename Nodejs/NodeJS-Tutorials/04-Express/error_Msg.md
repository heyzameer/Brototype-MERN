## Explanation of Flash Messages

### **What is Flash Messaging?**
Flash messages are temporary messages stored in the session that persist for one request-response cycle. They are useful for displaying success or error messages after form submissions (e.g., login errors, success notifications).

---

## **How Flash Messaging Works (Step by Step)**

### **1. Setup `express-session` Middleware**
Before using flash messages, we need session management because flash messages are stored in session storage.

```js
app.use(session({
    secret: 'fsdfsf', // A secure secret key for session encryption
    resave: false,  // Prevents resaving sessions unnecessarily
    saveUninitialized: true,  // Saves new sessions even if they haven't been modified
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000  // Session lasts for 1 day
    }
}));
```

- **Why Sessions?**  
  Flash messages require sessions because they persist temporarily for one request-response cycle.

---

### **2. Initialize `connect-flash` Middleware**
After setting up `express-session`, we register the flash middleware:

```js
app.use(flash());
app.use((req, res, next) => {
    res.locals.error_msg = req.flash('error');   // Store error messages in response locals
    res.locals.success_msg = req.flash('success'); // Store success messages in response locals
    next();
});
```

- `req.flash('error', 'Error Message')` → Stores an error message in the session.
- `req.flash('success', 'Success Message')` → Stores a success message in the session.
- `res.locals.error_msg` → Makes the messages accessible in EJS views.

---

### **3. Storing Flash Messages in the Controller (`loginPost` Example)**

```js
const loginPost = async (req, res) => {
    try {
        const { email, password } = req.body;

        const ifUser = await User.findOne({ email });

        if (!ifUser) {
            req.flash('error', 'Email is not correct');
            return res.redirect('/login');
        }

        if (password !== ifUser.password) {
            req.flash('error', 'Incorrect password');
            return res.redirect('/login');
        }

        req.session.user = email;
        req.session.isAuth = true;
        
        req.flash('success', 'Login successful!');
        return res.redirect('/');
    } catch (error) {
        console.log(error.message);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/login');
    }
};
```

#### **How It Works:**
1. If the email is incorrect, it sets `req.flash('error', 'Email is not correct')` and redirects.
2. If the password is incorrect, it sets `req.flash('error', 'Incorrect password')` and redirects.
3. If login is successful, `req.flash('success', 'Login successful!')` and redirects to the home page.

---

### **4. Displaying Flash Messages in EJS Views**
In your **EJS template**, add the following code to display messages:

```ejs
<% if (locals.error_msg && locals.error_msg.length > 0) { %>
    <div class="flash-message error"><%= locals.error_msg %></div>
<% } %>

<% if (locals.success_msg && locals.success_msg.length > 0) { %>
    <div class="flash-message success"><%= locals.success_msg %></div>
<% } %>
```

#### **How It Works:**
- It checks if `error_msg` or `success_msg` exists.
- If an error message exists, it is displayed inside `<div class="flash-message error">`.
- If a success message exists, it is displayed inside `<div class="flash-message success">`.

---

## **How to Implement Flash Messages Next Time**
1. Install dependencies:
   ```
   npm install express-session connect-flash
   ```
2. Setup middleware in `app.js`:
   ```js
   app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: true }));
   app.use(flash());
   app.use((req, res, next) => {
       res.locals.error_msg = req.flash('error');
       res.locals.success_msg = req.flash('success');
       next();
   });
   ```
3. Use `req.flash('error', 'Message')` or `req.flash('success', 'Message')` in controllers.
4. Display messages in **EJS** using:
   ```ejs
   <% if (locals.error_msg) { %>
       <div class="alert alert-danger"><%= locals.error_msg %></div>
   <% } %>

   <% if (locals.success_msg) { %>
       <div class="alert alert-success"><%= locals.success_msg %></div>
   <% } %>
   ```

---

<script>
    setTimeout(() => {
        const flashMessage = document.querySelector('.flash-message');
        if (flashMessage) {
            flashMessage.style.display = 'none';
        }
    }, 3000); // Hide after 3 seconds
</script>

## **Final Thoughts**
Flash messages help provide user feedback after form submissions or actions. Since they last for only one request, they are useful for status messages like login errors, success notifications, or general warnings.

Let me know if you need further clarification! 🚀

















In **EJS and Express**, you can pass a variable from your server to the frontend and trigger a **SweetAlert** when the page loads. Here's how to do it:

---

### **1. Install SweetAlert2**
Include the SweetAlert2 CDN in your EJS template:

```html
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
```

---

### **2. Express Route (Backend)**
In your **Express.js server**, pass a success message after login.

```javascript
app.post("/login", (req, res) => {
    // Perform login logic
    const isLoggedIn = true; // Replace with actual login validation

    if (isLoggedIn) {
        res.render("dashboard", { message: "Login Successful!" });
    } else {
        res.render("login", { message: "Invalid Credentials" });
    }
});
```

---

### **3. EJS Template (Frontend)**
In your `dashboard.ejs`, check for the `message` variable and show **SweetAlert** if it's set.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>

    <h1>Welcome to Dashboard</h1>

    <script>
        let message = "<%= message %>"; // Get message from server

        if (message) {
            Swal.fire({
                title: message,
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        }
    </script>

</body>
</html>
```

---

### **How It Works**
1. The **Express route** sends a `message` when rendering `dashboard.ejs`.
2. The **EJS template** injects the message into JavaScript.
3. If a message exists, **SweetAlert** displays it when the page loads.

---

### **Alternative: Using Flash Messages**
If you want to show alerts **only once**, use **Express flash messages**:

#### **Install Flash Messages**
```sh
npm install express-session connect-flash
```

#### **Configure in Express**
```javascript
const session = require("express-session");
const flash = require("connect-flash");

app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(flash());
```

#### **Modify Login Route**
```javascript
app.post("/login", (req, res) => {
    req.flash("success", "Login Successful!");
    res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
    res.render("dashboard", { message: req.flash("success") });
});
```

#### **Modify EJS Template**
```html
<script>
    let message = "<%= message %>";

    if (message) {
        Swal.fire({
            title: message,
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });
    }
</script>
```

✅ **This way, the message disappears after being displayed once!**