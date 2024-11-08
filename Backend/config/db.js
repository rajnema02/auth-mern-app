require("dotenv").config();
const mongoose = require("mongoose");
const {DB_URI} = require("../config/config");


console.log("DB_URI:",DB_URI);
const connectDB =async()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log("Mongodb Connected");
    }
    catch(err){
        console.log("connection failed",err.message);
        process.exit(1);
    }
}

module.exports = connectDB;