const express = require("express");
const app = express();
const connectDB = require("./config/database.js")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")
const requestRouter  =require("./routes/request.js");
const userRouter = require("./routes/user.js")
const chatRouter = require("./routes/chat.js");
const initializeSocket = require("../utils/socket.js")
const cors = require("cors")

const http = require("http");

const server = http.createServer(app);
initializeSocket(server);

require("dotenv").config();

app.use(cors({
    origin: 'https://kgpsparks.onrender.com',
    credentials : true,
    }))
app.use(express.json());
app.use(cookieParser());
app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);
app.use("/" , userRouter);
app.use("/" , chatRouter)




connectDB()
    .then(() => {
        console.log("DB connection established")
    })
    .then(() => {
        server.listen(3333, () => {
            console.log("server created and running")
        })
    })
    .catch((err) => {
        console.log("DB connection failed" + err.message)
    })


