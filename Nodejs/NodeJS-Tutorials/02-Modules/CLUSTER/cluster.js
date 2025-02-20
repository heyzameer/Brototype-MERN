// const cluster = require('cluster');
// const http = require('http');

// if(cluster.isMaster) {
//     console.log('Master ${process.pid} is running');
//     cluster.fork();
//     cluster.fork();
// }else{
//     console.log('Worker ${process.pid} started');
    
//     const server = http.createServer((req, res) => {
//         if (req.url === "/") {
//             res.writeHead(200, { "Content-Type": "text/plain" });
//             res.end("Home page");
//         } 
//         else if (req.url === "/slow-page") {
//             // Simulate CPU work
//             for (let i = 0; i < 6000000000; i++) {}
    
//             res.writeHead(200, { "Content-Type": "text/plain" });
//             res.end("Slow Page");
//         } 
//         else {
//             res.writeHead(404, { "Content-Type": "text/plain" });
//             res.end("404 Not Found");
//         }
//     });
    
//     server.listen(8000, () => console.log("Server is running on port 8000"));
    
    
// }
    



// const numCPUs = require('os').cpus().length; // to get number of thread

// console.log(numCPUs);

// ## **What is a Worker and What is a Cluster in Node.js?**  

// ### **📌 Worker (Child Process)**
// A **worker** is a separate process that can execute tasks independently of the main process. In Node.js, **Worker Threads** or **Child Processes** are used to run CPU-intensive tasks without blocking the event loop.  

// ### **📌 Cluster Module**
// The **Cluster module** in Node.js allows you to create **multiple worker processes** that run the same server code. This helps distribute incoming requests across multiple CPU cores, improving performance.  

// ---

// ## **📜 Explanation of Your Code**
// ```js
// const cluster = require('cluster');
// const http = require('http');

// if (cluster.isMaster) {  // Master process
//     console.log(`Master ${process.pid} is running`);
    
//     // Fork two worker processes
//     cluster.fork();
//     cluster.fork();
// } else {  // Worker process
//     console.log(`Worker ${process.pid} started`);
    
//     const server = http.createServer((req, res) => {
//         if (req.url === "/") {
//             res.writeHead(200, { "Content-Type": "text/plain" });
//             res.end("Home page");
//         } 
//         else if (req.url === "/slow-page") {
//             // Simulate CPU work
//             for (let i = 0; i < 6000000000; i++) {}
    
//             res.writeHead(200, { "Content-Type": "text/plain" });
//             res.end("Slow Page");
//         } 
//         else {
//             res.writeHead(404, { "Content-Type": "text/plain" });
//             res.end("404 Not Found");
//         }
//     });

//     server.listen(8000, () => console.log("Server is running on port 8000"));
// }
// ```

// ---

// ## **📌 How It Works**
// ### **🔵 Master Process**
// - **Runs first.**
// - **Creates multiple worker processes** using `cluster.fork()`.
// - Does **not handle HTTP requests** itself.

// ### **🟢 Worker Processes**
// - Each **worker runs the HTTP server**.
// - The **OS distributes incoming requests** among workers.
// - If a request comes to **"/slow-page"**, one worker will handle it while others continue serving other requests.

// ---

// ## **🖥️ Example Output**
// ```bash
// Master 12345 is running
// Worker 12346 started
// Worker 12347 started
// Server is running on port 8000
// Server is running on port 8000
// ```
// Here, **two worker processes (12346, 12347) run separate instances of the HTTP server**.

// ---

// ## **🚀 Why Use Clustering?**
// ✅ **Improves Performance** → Utilizes multiple CPU cores.  
// ✅ **Handles More Requests** → Prevents blocking due to slow routes.  
// ✅ **Ensures Fault Tolerance** → If one worker crashes, others still run.  

// 🔴 **Limitation**: Workers **do not share memory**. So, using in-memory storage (like variables) across workers won’t work.

// ---

// ## **🛠️ Alternative: Worker Threads**
// For CPU-heavy tasks, **Worker Threads** are better than clusters because:
// - They allow **parallel execution** without blocking the main thread.
// - They can **share memory** using `SharedArrayBuffer`.

// Let me know if you need a Worker Threads example! 🚀









