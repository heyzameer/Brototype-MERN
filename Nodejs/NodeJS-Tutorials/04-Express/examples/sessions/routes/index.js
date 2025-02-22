const express = require('express');
const router = express.Router();
const user = require('./user');
const products = require('./products');

router.use('/user', user);  // Mount user routes at /user
router.use('/products', products); // Mount products routes at /products

module.exports = router;