const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser('your-secret-key')); // Use a secret for signed cookies

app.get('/', (req, res) => {
  // Access cookies
  console.log('Cookies:', req.cookies);
  console.log('Signed Cookies:', req.signedCookies);

  // Set a normal cookie
  res.cookie('name', 'John Doe', { maxAge: 900000, httpOnly: true });

  // Set a signed cookie
  res.cookie('signedCookie', 'This is a signed cookie', { signed: true });

  res.send('Check your cookies!');
});

app.get('/clear', (req, res) => {
  res.clearCookie('name'); // Clears the 'name' cookie
  res.clearCookie('signedCookie'); // Clears the signed cookie
  res.send('Cookies have been cleared!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
