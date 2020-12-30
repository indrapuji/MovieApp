const express = require('express');
const router = express.Router();
const wishlistRouter = require('./wishlist');
const UserController = require('../controllers/UsersController');

router.get('/', (req, res) => res.json({ message: 'movieApp' }));

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use('/wishlist', wishlistRouter);

module.exports = router;
