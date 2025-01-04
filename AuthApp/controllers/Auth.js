const bcrypt = require('bcrypt');
const User = require("../models/userModel"); // so that controller can interact with DB through model

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

