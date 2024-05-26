
const express = require('express');
const router = express.Router();

// controllers
const { login, register } = require('../controllers/auth');

// routes
router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;