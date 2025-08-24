const mongoose = require("mongoose");


const toDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: "pending",
        enum: [ "pending", "completed" ]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, { timestamps: true });


const toDoModel = mongoose.model("toDo", toDoSchema);
module.exports = toDoModel;