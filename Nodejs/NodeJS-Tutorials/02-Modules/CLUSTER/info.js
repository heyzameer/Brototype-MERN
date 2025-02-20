// Cluster Module contd.
// The cluster module enables the creation of child processes (also called workers) that run simultaneously
// All created workers share the same server port


// master is incharge spawning workers and distributing incoming requests
// workers are the ones that handle the requests
// each worker gets its own event loop and memory space

// The cluster module is useful for scaling Node.js applications across multiple CPU cores.

//using cluter second request will not be blocked by the first request




// Cluster Module contd.
// Why shouldn't we simply create a large number of workers using cluster.fork()?
// We should only create as many workers as there are CPU cores on the machine the app is running
// If you create more workers than there are logical cores on the computer it can cause an overhead as the system will have to schedule all the created workers with fewer number of cores
