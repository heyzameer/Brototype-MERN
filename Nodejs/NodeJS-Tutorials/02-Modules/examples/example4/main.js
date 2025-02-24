// // main.js
// const myModule = require('./myModule');

// myModule.publicFunction(); // Outputs: "Private counter incremented: 1" and "Public function called"
// myModule.publicFunction(); // Outputs: "Private counter incremented: 2" and "Public function called"

// console.log(myModule.myObject.name); // Output: Example
const fs = require('fs').promises;
const path = require('path');

const data = 'This is the data to write to the file.';
const filepath =path.join(__dirname, 'output.txt');
// fs.writeFile(filepath, data, 'utf8', (err) => {
//   if (err) {
//     console.error('Error writing file:', err);
//     return;
//   }
//   console.log('File written successfully.');
// });

// fs.readFile(filepath, 'utf8', (err, data) => {
    // if (err) {
    //     console.error('Error reading file:', err);
    //     return;
    //     }
    //     console.log('File contents:', data);
    // });

async function writeFileAsync(filepath, data) {
    try {
        if(!fs.existsSync(filepath)){
        // errror handling for file not found
        console.error('File not found:', filepath);
        return;
        }
        await fs.writeFile(filepath, data);
        console.log('File written successfully.');
        } catch (err) {
            console.error('Error writing file:', err);
            }
            }
            async function readFileAsync(filepath) {
                try {
                    const data = await fs.readFile(filepath, 'utf8');
                    console.log('File contents:', data);
                    } catch (err) {
                        console.error('Error reading file:', err);
                        }
                        }
writeFileAsync(filepath, data)
.then((data) => {   
    readFileAsync(filepath);
});