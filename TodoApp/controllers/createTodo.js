//import the model

const Todo = require("../models/Todo");

//define route handler

exports.createTodo = async(req,res) =>{
    try{
        //extract title and description from request body
        const {title, description} = req.body;
        //create a new Todo object and insert in DB
        const response = await Todo.create({title,description}); 
        // send a JSON response with a sucess flag
        res.status(200).json(
            {
                success:true,
                data:response,
                message:"Entry created successfully"
            }
        )
    }
    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:err.message,
        })
    }
}