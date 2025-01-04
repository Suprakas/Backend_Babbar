const mongoose = require("mongoose"); // Fixed typo: changed 'required' to 'require'

const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
    },
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogModel",
        required: true,
    },
    comment:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now(),
    },
    updatedAt:{
        type: Date,
        required: true,
        default: Date.now(),
    },
});

module.exports = mongoose.model("commentModel", commentSchema); // Fixed typo: changed 'Model' to 'model'