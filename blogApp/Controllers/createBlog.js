// import the Model
const blogModel = require("../Models/blogModel");

// Create a new blog
const createBlog = async (req, res) =>{
    try{
        // extract title, description and body from request body
        const {title, content, author, tags } = req.body;
        // create a new blog object and insert in DB
        const response = await blogModel.create({title, content, author, tags});
        // send a JSON response with a success flag
        res.status(200).json({
            success: true,
            data: response,
            message: "Entry created successfully",
        });
    }
    catch(err){
        console.log(err);
        console.error(err.message);
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message,
        });
    }
};

module.exports = createBlog;

