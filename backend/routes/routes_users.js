const express = require('express');
const { login, logout, signup, addToCart, removeFromCart, checkCart } = require('../controllers/users.js');
const { check_user } = require('../middleware/check_user.js');

const router = express.Router();

router.get('/',)
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/addToCart', check_user, addToCart);
router.post('/removeFromCart', check_user, removeFromCart);
router.post('/cart', check_user, checkCart);




module.exports = router;