const express = require("express");
const { userAuth } = require("../../middlewares/auth");
const chatRouter = express.Router();
const Chat = require("../models/chat.js");
const User = require("../models/user.js");

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const {targetUserId} = req.params;
    const loggedInUser = req.user;

    if(!loggedInUser || !targetUserId){
        res.status(404).send("Chat not found");
    }

    let chat = await Chat.findOne({
      participants: { $all: [loggedInUser._id, targetUserId] },
    }).populate({path : "messages.sender" , select : "firstName _id"})

    let receiver = await User.findById(targetUserId).select("_id , photoUrl")
    if(!receiver){
        res.status(404).send("Receiver not found");
    }

    if(!chat){
        chat = new Chat({
            participants : [loggedInUser._id , targetUserId],
            messages : []
        })
    }
    await chat.save()
    res.json({chat , receiver : receiver})

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = chatRouter;
