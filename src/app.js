const express = require("express");
const app = express();
const connectDB = require("./config/database.js")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")
const requestRouter  =require("./routes/request.js");
const userRouter = require("./routes/user.js")

app.use(express.json());
app.use(cookieParser());
app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);
app.use("/" , userRouter);




connectDB()
    .then(() => {
        console.log("DB connection established")
    })
    .then(() => {
        app.listen(3333, () => {
            console.log("server created and running")
        })
    })
    .catch((err) => {
        console.log("DB connection failed" + err.message)
    })


