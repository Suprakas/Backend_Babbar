const mongoose = require('mongoose'); // Fixed typo: changed 'required' to 'require'

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model("userModel", userSchema);
