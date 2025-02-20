const fsp = require('fs').promises;
const fs = require('fs');

async function readFile() {
    try {
        let data = await fsp.readFile('./file.txt', 'utf-8');
        console.log('📄 *File content:', data);
        return data;
    } catch (error) {
        console.error('❌ Error reading file:', error.message);
        return null;
    }
}

async function writeFile(data) {
    try {
        if (!data) {
            console.error('❌ No data to write!');
            return;
        }
        await fsp.writeFile('./asynwrite.txt', data, 'utf-8');
        console.log('✅ File written successfully');
    } catch (error) {
        console.error('❌ Error writing file:', error.message);
    }
}

// Another function using additional fs methods
async function anotherFunction() {
    try {
        console.log('🚀 Running another function after writeFile...');

        // Get file stats (size, created time, etc.)
        let stats = await fsp.stat('./asynwrite.txt');
        console.log(`📂 File Size: ${stats.size} bytes`);
        console.log(`📅 File Created: ${stats.birthtime}`);

        // Read directory contents
        fs.readdir('.', (err, files) => {
            if (err) {
                console.error('❌ Error reading directory:', err.message);
                return;
            }
            console.log('📁 Files in directory:', files.join(', '));
        });

        // Read back the file content using callback-based fs.readFile
        fs.readFile('./asynwrite.txt', 'utf-8', (err, data) => {
            if (err) {
                console.error('❌ Error reading the written file:', err.message);
                return;
            }
            console.log('📜 Content of asynwrite.txt:', data);
        });

    } catch (error) {
        console.error('❌ Error in another function:', error.message);
    }
}

// Execute the functions in sequence
readFile()
    .then((data) => {
        if (data) {
            console.log('✅ File read successfully');
            return writeFile(data);
        }
    })
    .then(() => anotherFunction()) // Run another function after writeFile
    .catch((error) => console.error('❌ Error:', error.message));
