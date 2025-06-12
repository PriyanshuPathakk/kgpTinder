const mongoose = require("mongoose")
const validator = require("validator");
const User = require("./user.js");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required :true,
        ref : "User"
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    status : {
        type : String,
        required : true,
        validate(value){
            if(!["ignored" , "accepted" , "rejected" , "interested"].includes(value.toLowerCase())){
                throw new Error("Invalid Status request")
            }
        }
    }

},
{
    timestamps : true
})
connectionRequestSchema.index({fromUserId : 1 , toUserId : 1})

connectionRequestSchema.pre("save" , function (next) {
    if(this.fromUserId.equals(this.toUserId)){
       return next(new Error("You cannot send request to yourself"))
    }
    next()
})

module.exports = mongoose.model("ConnectionRequest" , connectionRequestSchema)
