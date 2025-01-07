const bcrypt = require('bcrypt');
const User = require("../models/userModel"); // so that controller can interact with DB through model
const jwt = require('jsonwebtoken');
require('dotenv').config();

// signup route handler

exports.signup = async (req, res) =>{
    try{
        //get data
        const {name, email, password, role} = req.body;
        // check if user already exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.send(400).json({
                success: false,
                message: "User already exists",
            });
        }
        // hash the password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: "Password hash failed",
            })
        }

        // create a new user object and insert in DB

        const user = await User.create(
            {
                name,
                email,
                password: hashedPassword,
                role,
            }
        );
        return res.status(200).json({
            success: true,
            data: user,
            message: "User created successfully",
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            data: "User can not be registered, please try again later ..",
            message: err.message,
        })
    }
}

// login route handler

exports.login = async (req, res) =>{
    try{
        //data fetch
        const {email, password} = req.body;
        // check if user exists
        if(!email || !password){
            return res.status(400).jsoon({
                success: false,
                message: "Please provide correct email and password",
            })
        };
        //check for registered user
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered",
            })
         };

         const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
         };

         // verify user and create a jwt token

         if(await bcrypt.compare(password, user.password)){
            // password match
           let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "4h"});

           user = user.toObject();
           user.token = token;
           user.password = undefined;
           
           const options = {
            expires: new Date( Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
           };

           res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully",
           });
         }

         else{
            //password do not match
            return res.status(403).json({
                success: false,
                message: "Password is incorrect",
            });
         }
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Login failed",
        });
    };
}

