// import the model

const Blog = require("../Models/blogModel");

// Get all blogs

const getBlog = async (req, res) => {
    try {
        const response = await Blog.find();
        res.status(200).json({
            success: true,
            data: response,
            message: "All blogs fetched successfully",
        });
    }
    catch (err) {
        console.log(err);
        console.error(err.message);
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message,
        });
    }
};

// get a single blog

const getBlogById = async (req, res) => {
    try{
        const response = await Blog.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: response,
            message: "Blog fetched successfully",
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

module.exports = { getBlog, getBlogById };