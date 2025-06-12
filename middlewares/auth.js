const jwt = require("jsonwebtoken")
const User = require("../src/models/user.js")
const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token) throw new Error("Token is invalid");
        const decodedInfo = jwt.verify(token, "PP$20011976");
        const { _id } = decodedInfo;
        const user = await User.findOne({_id : _id})
        if (!user) {
            return res.status(401).send("ERROR: User not found.");
        }
        req.user = user;
        next()
    }
    catch (err) {
        res.status(400).send("ERROR : "+ err.message)
    }
}

module.exports = { userAuth };