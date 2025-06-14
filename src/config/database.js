const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://priyanshu:C7mem2H5kwaki9nu@learnmongo.ue0ly23.mongodb.net/kgpTinder") 
}

module.exports = connectDB;