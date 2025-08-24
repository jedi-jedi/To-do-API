const express = require("express");
const toDoRouter = express.Router();
const { createToDo, getTodo, getSingleTodo, updateSingleToDo, deleteToDo } = require("../controllers/toDoController");
const isLoggedIn  = require("../middlewares/isLoggedIn");


toDoRouter.post("/create", isLoggedIn, createToDo);
toDoRouter.get("/get-Todo", isLoggedIn,  getTodo);
toDoRouter.get("/get-Todo/:id", isLoggedIn, getSingleTodo);
toDoRouter.patch("/update-Todo/:id", isLoggedIn, updateSingleToDo);
toDoRouter.delete("/delete-Todo/:id", isLoggedIn, deleteToDo);

module.exports = toDoRouter;