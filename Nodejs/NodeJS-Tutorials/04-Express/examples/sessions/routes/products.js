const express = require('express');
const router = express.Router();

// Read a regular cookie
router.get('/read-regular-cookie', (req, res) => {
    const myCookieValue = req.cookies.myRegularCookie; // Access regular cookie
    if (myCookieValue) {
        res.send(`The value of myRegularCookie is: ${myCookieValue}`);
    } else {
        res.send('myRegularCookie is not set.');
    }
});

// Read a signed cookie
router.get('/read-signed-cookie', (req, res) => {
    const myCookieValue = req.signedCookies.mySignedCookie; // Access signed cookie
    if (myCookieValue) {
        res.send(`The value of mySignedCookie is: ${myCookieValue}`);
    } else {
        res.send('mySignedCookie is not set.');
    }
});

// Access session data (Example)
router.get('/read-session', (req, res) => {
    if (req.session.username) {
        res.send(`Session username: ${req.session.username}`);
    } else {
        res.send('Session username not set.');
    }
});


module.exports = router;