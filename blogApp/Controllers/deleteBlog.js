const blogModel = require("../Models/blogModel");

const deleteBlog = async (req, res) => { 
    try{
        const response = await blogModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: response,
            message: "Entry deleted successfully",
        })
    }
    catch(err){
        console.log(err);
        console.error(err.message);
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message,
        })
    }
}

module.exports = deleteBlog;
