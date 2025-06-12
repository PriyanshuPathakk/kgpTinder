const validator = require("validator");
const validateUser = (req)=> {
    const {firstName , lastName , password , gender , preferrence , emailID } = req.body;
    if(firstName.length < 2 || firstName.length > 20 ){
        throw new Error("Name must contain atleast 2 characters and atmost 20 Characters")
    }
    else if(lastName.length < 2 || lastName.length > 20){
        throw new Error("Last Name must contain atleast 2 characters and atmost 20 Characters")
    }
    else if( !validator.isEmail(emailID)){
        throw new Error("Please Enter a valid Email ID")
    }
    else if( !validator.isStrongPassword(password)){
        throw new Error("Please Enter a Strong Password")
    }
}

const validateReqBody = (req)=>{
    const editableFields = ["firstName" , "lastName" , "age" , "gender" , "preferrence" , "skills"];
    const isEditable = Object.keys(req.body).every((field)=> editableFields.includes(field));
    if(!isEditable){
        return false;
    }
    else{
        return true;
    }
}
module.exports = {validateUser , validateReqBody}