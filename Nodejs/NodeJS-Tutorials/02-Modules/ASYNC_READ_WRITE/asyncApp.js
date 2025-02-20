const fsp = require('fs').promises;

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

// Another function to run after writeFile
async function anotherFunction() {
    try {
        console.log('🚀 Running another function after writeFile...');
        let stats = await fsp.stat('./asynwrite.txt');
        console.log(`📂 File Size: ${stats.size} bytes`);
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
    .then(() => {
        return anotherFunction(); // Runs another function after writeFile
    })
    .catch((error) => console.error('❌ Error:', error.message));
