const fs = require('fs');

const readStream = fs.createReadStream('large_file.txt', { encoding: 'utf8',highWaterMark:2 });


const writeStream = fs.createWriteStream('output.txt');

//stream size 64kb
readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk);
  // Process the chunk of data
  writeStream.write(chunk);

});


readStream.on('end', () => {
  console.log('Finished reading file');
});

readStream.on('error', (err) => {
  console.error('Error reading file:', err);
});