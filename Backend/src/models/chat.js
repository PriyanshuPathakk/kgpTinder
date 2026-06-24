const mongoose = require("mongoose")
const User = require("./user.js")

const messageSchema = mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : User
    },
    text : {
        type : String,
        required : true
    }
},
{timestamps : true}
)


const chatSchema = mongoose.Schema({
    participants : [
        {type : mongoose.Schema.Types.ObjectId , required : true , ref : User }
    ],
    messages : [messageSchema]
},
{timestamps : true})

module.exports = mongoose.model("Chat" , chatSchema )