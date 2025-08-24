const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config()
const connectToDb = require("./config/connectDb");
connectToDb();


//middleware function
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routers
const userRouter = require("./routers/userRouter");
const toDoRouter = require("./routers/toDoRouter");





PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
});


app.use("/users", userRouter);
app.use("/todo", toDoRouter);