const mongoose = require("mongoose");
const toDoModel = require("../models/toDoModel");


//create To-Do    
const createToDo = async (req, res)=>{
    try {
        const userId = req.user._id;
        const { title, description } = req.body;

        // Validate title
        if (!title || typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({
                status: "error",
                message: "Title is required"
            })
        }

        //create to-do
        const newToDo = await toDoModel.create({
            title,
            description,
            user: userId
        });

        return res.status(200).json({
            status: "success",
            message: "To-Do created successfully",
            newToDo
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Server error"
        });
    }
};


//Get all To-do for the logged-in user
const getTodo = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                status: "error",
                message: "User not authorized"
            });
        }

        //Get logged-in user from req.user(set by isLoggedIn.js)
        const userId = req.user._id
        const { status } = req.query;

        const query = { user: userId };
        if (status && ["pending", "completed"].includes(status)) {
            query.status = status;
        } else {
            // return res.status(400).json({
            //     status: "error",
            //     message: "Invalid parameter."
            // })
        }

        //find all to-dos for the User
        const todos = await toDoModel.find(query).sort({ createdAt: -1 });
        return res.status(200).json({
            status: "success",
            message: "To-dos retrieved successfully",
            data: todos
        });


    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            status: "error",
            message: "Server error"
        });
        
    }
};

//Get a single todo for a logged-in User
const getSingleTodo = async (req, res) => {
    try {
        //Get logged-in user from req.user(set by isLoggedIn.js)
        const userId = req.user._id;

        //get to-do id 
        const toDoId = req.params.id;

        //find a single to-do
        const singleToDo = await toDoModel.findOne({ _id: toDoId, user: userId });
        if(!singleToDo){
            return res.status(404).json({
                status: "error",
                message: "To-do not found"
            });
        };

        return res.status(200).json({
            status: "success",
            message: "To-do rtrieved successfully",
            data: singleToDo
        });

    } catch (error) {
        console.log(error, error.message);
            return res.status(500).json({
            status: "error",
            message: "Server error"
        });
    }
}


//Update a to-do for a logged-in user
const updateSingleToDo = async (req, res) => {
    try {

        //Get logged-in user from req.user(set by isLoggedIn.js)
        const userId = req.user._id;

        //get to-do id 
        const toDoId = req.params.id;


        // validate toDoId
        // if (!mongoose.isValidObjectId(toDoId)) {
        //     return res.status(400).json({
        //         status: "error",
        //         message: "Invalid to-do Id"
        //     });
        // };
        
    
        //Update to-Do
        const updatedToDo = await toDoModel.findOneAndUpdate(
            { _id: toDoId, user: userId },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        

        //check if to-do exists and belong to user
        if (!updatedToDo) {
            return res.status(404).json({
                status: "error",
                message: "To-do not found or you don't have the permission to update"
            });            
        };


        return res.status(200).json({
            status: "success",
            message: "To-do updated successfully",
            data: updatedToDo
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            status: "error",
            message: "Server error"
        });
        
    }
   
};

//Delete a single to-do for a logged-in User
const deleteToDo = async (req, res) => {
    try {
        //Get logged-in user from req.user(set by isLoggedIn.js)
        const userId = req.user._id;


        //get to-do id 
        const toDoId = req.params.id;

        //validate toDoId
        // if (!mongoose.isValidObjectId(toDoId)) {
        //     return res.status(400).json({
        //         status: "error",
        //         message: "Invalid to-do Id"
        //     });
        // };

        if (!toDoId) {
            return res.status(400).json({
                status: "error",
                message: "Invalid Id"
            })
        }

        //Delete To-Do
        const deletedToDo = await toDoModel.deleteOne({ _id: toDoId, user: userId });


        // check if a to-do was deleted
        if (deletedToDo.deletedCount === 0) {
            return res.status(404).json({
                status: "error",
                message: "To-do not found or you don't have permission to delete it"
            });
        }

        //response
        res.status(200).json({
            status: "success",
            message: "To-do has been deleted"
        });

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            status: "error",
            message: "Server error"
        });
    }
};

module.exports = {
    createToDo,
    getTodo,
    getSingleTodo,
    updateSingleToDo, 
    deleteToDo
}