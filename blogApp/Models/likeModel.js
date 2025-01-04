const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
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
    liked:{
        type: Boolean,
        default: true,
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

module.exports = mongoose.model("likeModel", likeSchema); // Fixed typo: changed 'Model' to 'model'