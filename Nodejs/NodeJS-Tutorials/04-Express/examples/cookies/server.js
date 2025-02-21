const express = require('express');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const app = express();

// Use the cookie-parser middleware.  It needs to be used *before* any routes
// that access cookies.
// signed cookies are signed with the secret key provided to cookieParser
app.use(cookieParser("signed"));

app.get('/set-cookie', (req, res) => {
  res.cookie('myCookie', 'someValue', {
    maxAge: 10000, // Expires in 15 minutes (in milliseconds)
    httpOnly: true,  // Not accessible via JavaScript
    secure: true,    // Only sent over HTTPS in production
    sameSite: 'strict' ,// Strict CSRF protection
    signed: true
  });
  
  res.send('Cookie set!');
});

// app.get('/read-cookie', (req, res) => {
//   const myCookieValue = req.cookies.myCookie; // Access the cookie
//   console.log(myCookieValue)
//   if (myCookieValue && myCookieValue == 'someValue') {
//     res.send(`The value of myCookie is: ${myCookieValue}`);
//   } else {
//     res.send('myCookie is not set.');
//   }
// });

app.get('/read-cookie', (req, res) => {
  const myCookieValue = req.signedCookies.myCookie; // Access the cookie
  console.log(myCookieValue)
  if (myCookieValue && myCookieValue == 'someValue') {
    res.send(`The value of myCookie is: ${myCookieValue}`);
  } else {
    res.send('myCookie is not set.');
  }
});

app.get('/delete-cookie', (req,res)=>{
    res.clearCookie('myCookie');
    res.send('Cookie deleted!')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});