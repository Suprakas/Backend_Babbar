// Import the model
const Blog = require("../Models/blogModel"); // Fixed typo: changed 'updateBlog' to 'Blog'

// Update a blog
const updateBlog = async (req, res) => { // Fixed typo: changed 'updatedBlog' to 'updateBlog'
    try{
        const {title, content, author, tags} = req.body;
        const response = await Blog.findByIdAndUpdate(req.params.id, {title, content, author, tags});
        res.status(200).json({
            success: true,
            data: response,
            message: "Entry updated successfully",
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

module.exports = updateBlog; // Fixed typo: changed 'updatedBlog' to 'updateBlog'