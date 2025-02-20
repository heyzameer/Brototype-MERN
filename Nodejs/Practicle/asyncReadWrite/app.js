const fs = require('fs');


fs.readFile('./file.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('❌ Error reading file:', err.message);
        return; // Prevents further execution
    }
    console.log('📄 File content:', data);


    fs.writeFile('./output.txt', data, (err) => {
        if (err) throw err;
        console.log('File written successfully');
    });
});



let content = 'new data is from the content variable'

fs.writeFile('./output2.txt',content,(err)=>{    
    if(err) throw err;
    console.log('File written successfully');
    });



const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);


async function readFile() {
    try {
        let data = await readFileAsync('./file.txt', 'utf-8');
        console.log('📄 *File content:', data);
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

readFile();
const fsp = require('fs').promises;
async function readFile2() {
    try {
        let data = await fsp.readFile('./file.txt', 'utf-8');
        console.log('📄 **File content:', data);
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

readFile2();
