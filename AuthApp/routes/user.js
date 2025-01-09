const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// import controller

const {login, signup} = require('../controllers/Auth');
const {auth, isStudent, isAdmin} = require("../middlewares/auth");

// define API routes

router.post('/login', login );
router.post('/signup', signup);

// testing protected routes for middlewares

router.get('/test', auth, (req, res) =>{
    res.status(200).json({
        success: true,
        message: "Welcome to the protected route for Tests.",
    });
});

// protected routes

router.get('/student', auth, isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the protected routes for students",
    });
});

router.get('/admin', auth, isAdmin, (req, res) =>{
    res.status(200).json({
        success: true,
        message: "WWelcome to the protected route for Admin",
    });
});

router.get('/getEmail', auth, async (req, res) =>{
    try {
        const id = req.user.id;
        console.log("ID :", id);
        const user = await User.findById(id);
        res.status(201).json({
            success: true,
            user: user,
            message: "Welcome to email route",
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            error: error.message,
            message: "Error in code",
        });
    }
    
});

module.exports = router;

