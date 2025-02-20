# Server Concepts

## What is a Server?
A **server** is a computer or software that provides resources, data, or services to other computers (clients) over a network. It **listens for requests** from clients and responds accordingly.

---

## Types of Servers
Servers come in different types based on their functionality:

1. **Web Server** – Hosts websites and serves web pages over the internet.  
   - Example: Apache, Nginx, Node.js with Express  
   - Protocol: HTTP/HTTPS  

2. **Application Server** – Runs backend logic and processes business applications.  
   - Example: Express.js, Spring Boot, Django  

3. **Database Server** – Stores and manages databases for applications.  
   - Example: MySQL, PostgreSQL, MongoDB  

4. **File Server** – Manages and provides access to files over a network.  
   - Example: FTP server, Google Drive  

5. **Mail Server** – Handles sending and receiving emails.  
   - Example: Microsoft Exchange, Postfix  

6. **Proxy Server** – Acts as an intermediary between clients and other servers to improve security and performance.  
   - Example: Squid Proxy, Nginx  

7. **DNS Server** – Translates domain names (like google.com) into IP addresses.  
   - Example: Google DNS (8.8.8.8), Cloudflare DNS  

---

## How Does a Server Work?
1. **Client Sends a Request** → A user accesses a website or application.  
2. **Server Processes the Request** → The server receives the request, processes data, and prepares a response.  
3. **Server Sends a Response** → The processed data is sent back to the client.  

### Example: Web Server in Node.js
```javascript
const http = require('http');

// Create a simple server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
});

// Start the server on port 3000
server.listen(7000, () => {
    console.log('Server running on http://localhost:7000');
});
```
- The **server listens on port 7000** for incoming HTTP requests.  
- When a request is received, it responds with `"Hello, World!"`.  

---

## Difference Between Server and Client
| Feature | Server | Client |
|---------|--------|--------|
| **Role** | Provides resources/services | Requests resources/services |
| **Example** | Web server, Database server | Browser, Mobile app |
| **Initiates Requests?** | No, it responds | Yes, it requests |
| **Processing** | Handles multiple clients | Handles individual user actions |

---

## Conclusion
A **server** is a system that listens for and responds to client requests. It plays a crucial role in delivering websites, applications, and services across the internet.
