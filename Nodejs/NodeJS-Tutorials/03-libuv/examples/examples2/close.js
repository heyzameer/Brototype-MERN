const fs = require("fs");

const readableStream = fs.createReadStream(__filename);

readableStream.on("close", () => {
    console.log("this is from readableStream close event callback");
});

readableStream.close(); // Closing the stream immediately

console.log("this is from main thread");

process.nextTick(() => console.log("this is process.nextTick 1"));

setImmediate(() => console.log("this is setImmediate 1"));

setTimeout(() => console.log("this is setTimeout 1"), 0);

Promise.resolve().then(() => console.log("this is Promise.resolve 1"));
