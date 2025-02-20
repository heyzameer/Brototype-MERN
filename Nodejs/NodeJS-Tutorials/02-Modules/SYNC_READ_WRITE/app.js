const fs = require('fs');

let text = fs.readFileSync('./file.txt', 'utf8');

console.log(text);


let a = `data read from file.txt ${text}\nDate created ${new Date()}`;
// fs.writeFileSync('./output.txt', a);


fs.appendFileSync('./output.txt', a);


// ### 1. **Error Handling**  
// Since these methods are synchronous, they will throw errors if something goes wrong (e.g., file not found). Always use `try-catch` to handle errors.

// ```js
// const fs = require('fs');

// try {
//     let text = fs.readFileSync('./file.txt', 'utf8');
//     console.log(text);

//     let a = `Data read from file.txt: ${text}\nDate created: ${new Date()}`;
//     fs.writeFileSync('./output.txt', a);

//     console.log('File written successfully.');
// } catch (error) {
//     console.error('Error:', error.message);
// }
// ```

// ### 2. **Blocking Nature**  
// - Synchronous methods **block the execution** of the program until the operation completes.
// - This can **slow down** your app if working with large files.
// - If performance is critical, consider using asynchronous methods (`fs.readFile` and `fs.writeFile`).

// ### 3. **File Path Issues**  
// - Always use **absolute paths** (`path.join(__dirname, 'file.txt')`) to avoid issues with relative paths.
// - Example:

// ```js
// const path = require('path');

// let filePath = path.join(__dirname, 'file.txt');
// let text = fs.readFileSync(filePath, 'utf8');
// ```

// ### 4. **Appending to Files**  
// Instead of overwriting, use `fs.appendFileSync` to add content.

// ```js
// fs.appendFileSync('./output.txt', '\nAppended content.');
// ```

// ### 5. **Check if File Exists Before Reading**  
// To avoid errors, check if the file exists before reading:

// ```js
// if (fs.existsSync('./file.txt')) {
//     let text = fs.readFileSync('./file.txt', 'utf8');
//     console.log(text);
// } else {
//     console.log('File does not exist.');
// }
// ```

// // Would you like more details on async file handling or other `fs` methods? 🚀