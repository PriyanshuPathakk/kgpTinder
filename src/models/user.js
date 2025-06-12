const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: [20, 'Name is too long! please try your nickname']
    },
    lastName: {
        type: String,
        maxLength: [20, 'Name is too long! please try your nickname']
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter a Strong Password")
            }
        }

    },
    gender: {
        type: String,
        required: true,
        
        validate(value) {
            if (!["male", "female", "others"].includes(value.toLowerCase())) {
                throw new Error("gender must be male , female or other")
            }
        }
    },
    emailID: {
        type: String,
        required: true,
        unique: true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter a valid Email Address")
            }
        }

    },
    preferrence: {
        type: String,
        validate(value) {
            if (!["male", "female", "others" ,"all"].includes(value)) {
                throw new Error("gender must be male , female or other")
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://i.pinimg.com/236x/bb/df/ec/bbdfecbe813809bf72def9772538e323.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL")
            }
        }
    },
    age: {
        type: Number,
        required : true,
        min : [18,'You must be above the age of 18 to sign up']
    },
    about : {
        type : String
    } 
} , 
{
    timestamps : true
})

userSchema.methods.getJwtToken = function () {// do not use arrow function 
    const user = this;
    const token = jwt.sign({_id : user._id} , "PP$20011976" , {expiresIn : "7d"})
    return token
}
userSchema.methods.passwordCheck = async function (password) {
    const user = this;
    const passwordMatch = await bcrypt.compare(password/**this is the input password */ , user.password /**this is the hash password */)
    return passwordMatch;
}

module.exports = mongoose.model("User", userSchema)