const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://priyanshu:f4LqoRwhmF0QjPet@learnmongo.ue0ly23.mongodb.net/kgpTinder") 
}

module.exports = connectDB