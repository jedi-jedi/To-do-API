const mongoose = require("mongoose");
const dotenv = require("dotenv");

const mongodbUri = process.env.MONGODB_URI;
const connectToDb = async ()=>{
    console.log("connecting to MongoDB 🔄");
    try {
        const connected = await mongoose.connect(mongodbUri);
        if (connected) {
            console.log("MONGODB CONNECTED ✅👍");
            
        }
    } catch (error) {
        console.log(error, error.message);
        
    }
};


module.exports = connectToDb;