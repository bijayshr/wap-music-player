const express = require('express');
const userAuthController = require('../controllers/userAuthController');

const router = express.Router();

router.post('/login', userAuthController.authenticateUser);

module.exports = router;
