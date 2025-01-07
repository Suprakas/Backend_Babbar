const express = require('express');
const router = express.Router();

// import controller

const {login, signup} = require('../controllers/Auth');

// define API routes

router.post('/login', login );
router.post('/signup', signup);

module.exports = router;

