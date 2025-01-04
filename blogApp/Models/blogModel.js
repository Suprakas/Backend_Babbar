const mongoose = require('mongoose');

const blogAppSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength: 50,
    },
    content:{
        type:String,
        required: true,
    },
    author:{
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
    tags:{
        type: [String],
        required: true,
    },
    likes:{
        type: Number,
        default: 0,
    },
    comments:{
        type: Number,
        default: 0,
    },
    
    });

    module.exports = mongoose.model('blogModel', blogAppSchema);