In **Express.js**, there are multiple ways to send responses. Each method serves a specific purpose.  

---

## **🚀 Different Response Methods in Express**
| **Method**            | **What It Sends** | **Example** |
|----------------------|----------------|------------|
| **`res.send()`**      | Sends any type of response (`string`, `object`, `array`, `buffer`) | `res.send("Hello, World!")` |
| **`res.json()`**      | Sends JSON response (automatically sets `Content-Type: application/json`) | `res.json({ name: "John", age: 30 })` |
| **`res.render()`**    | Renders an **EJS/Pug/Handlebars** template | `res.render("home", { title: "Dashboard" })` |
| **`res.redirect()`**  | Redirects to another **URL or route** | `res.redirect("/dashboard")` |
| **`res.sendFile()`**  | Sends a **file** to the client | `res.sendFile(__dirname + "/file.pdf")` |
| **`res.download()`**  | Sends a file **as a download** | `res.download(__dirname + "/file.pdf")` |
| **`res.status()`**    | Sets **HTTP status code** (usually combined with other methods) | `res.status(404).send("Not Found")` |
| **`res.end()`**       | Ends the response **without sending data** | `res.status(200).end()` |

---

### **1️⃣ `res.send()` → General Purpose Response**
- Can send **strings, objects, arrays, or buffers**.  
- Automatically sets the correct `Content-Type`.

```js
app.get("/", (req, res) => {
    res.send("Hello, World!"); // Sends a plain text response
});

app.get("/array", (req, res) => {
    res.send([1, 2, 3, 4]); // Sends an array as JSON
});
```

---

### **2️⃣ `res.json()` → Sends JSON Response**
- Automatically **stringifies objects** and sets `Content-Type: application/json`.

```js
app.get("/user", (req, res) => {
    res.json({ name: "Alice", age: 25 });
});
```
✅ **Advantage:** No need to manually `JSON.stringify()`, unlike `res.send()`.

---

### **3️⃣ `res.render()` → Render Templates (EJS, Pug, Handlebars)**
- Used when serving **dynamic views**.

```js
app.set("view engine", "ejs"); // Set EJS as the templating engine

app.get("/dashboard", (req, res) => {
    res.render("dashboard", { title: "My Dashboard", user: "John Doe" });
});
```
✅ **Advantage:** Great for **server-side rendered (SSR) pages**.

---

### **4️⃣ `res.redirect()` → Redirect to Another Route**
- Redirects **to another URL or route**.

```js
app.get("/old-route", (req, res) => {
    res.redirect("/new-route"); // Redirects to new route
});
```
✅ **Advantage:** Useful for **handling outdated routes**.

---

### **5️⃣ `res.sendFile()` → Serve a File**
- Used to send **static files (PDFs, images, etc.)**.

```js
app.get("/download-pdf", (req, res) => {
    res.sendFile(__dirname + "/docs/sample.pdf");
});
```
✅ **Advantage:** Works well for **serving static files**.

---

### **6️⃣ `res.download()` → Force File Download**
- Sends a **file as a download attachment**.

```js
app.get("/download", (req, res) => {
    res.download(__dirname + "/docs/sample.pdf", "MyFile.pdf"); // Rename file
});
```
✅ **Advantage:** Forces **file download** instead of opening it.

---

### **7️⃣ `res.status()` → Set HTTP Status Code**
- **Set status + send response**.

```js
app.get("/not-found", (req, res) => {
    res.status(404).send("Page Not Found");
});
```

✅ **Common status codes:**
- `200 OK`
- `201 Created`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `500 Internal Server Error`

---

### **8️⃣ `res.end()` → End Response Without Data**
- Ends response **without sending content**.

```js
app.get("/stop", (req, res) => {
    res.status(204).end(); // No content
});
```
✅ **Advantage:** Useful when **you just need to terminate the response**.

---

### **🎯 When to Use Each?**
| **Scenario** | **Best Method** |
|-------------|---------------|
| **Return text, HTML, or simple data** | `res.send()` |
| **Return JSON API response** | `res.json()` |
| **Render an HTML page with EJS/Pug/Handlebars** | `res.render()` |
| **Redirect to another page** | `res.redirect()` |
| **Send a file (PDF, image, etc.)** | `res.sendFile()` |
| **Force file download** | `res.download()` |
| **Return a custom HTTP status code** | `res.status()` |
| **End response without content** | `res.end()` |

---

### 🚀 **Conclusion**
- **`res.send()`** → General response for text, HTML, or JSON.  
- **`res.json()`** → Best for API responses.  
- **`res.render()`** → Used when serving HTML templates.  
- **`res.redirect()`** → For route redirections.  
- **`res.sendFile()` / `res.download()`** → For file responses.  
- **`res.status()`** → Set HTTP status before sending data.  
- **`res.end()`** → End response without sending anything.

Let me know if you need more details! 🚀