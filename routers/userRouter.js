const express = require("express");
const { signup, signin, logout } = require("../controllers/userController");
const userRouter = express.Router();


userRouter.post("/", signup);
userRouter.post("/signin", signin);
userRouter.post("/logout", logout);


module.exports = userRouter;