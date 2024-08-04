const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.db_url;
const connectDB = async() => {
    try{
        await mongoose.connect(mongoURL);
        console.log("MongoDB Connected!");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = connectDB;