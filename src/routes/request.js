const express = require("express");
const ConnectionRequest = require("../models/connectionRequest.js");
const requestRouter = express.Router();
const { userAuth } = require("../../middlewares/auth.js");
const User = require("../models/user.js");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const status = req.params.status;
      const toUserId = req.params.toUserId;
      // validating the status request => status can only be ignored or interested
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid request : " + status);
      }
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("No user found");
      }

      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingRequest) {
        throw new Error("Connection Request already present");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: "Connection Request Sent Successfully",
        data: data
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:userId",
  userAuth,
  async (req, res) => {
    /** VALIDATIONS :-
     * status : accepted , rejected
     * userId : exist in my database
     * ConnectionRequest should have the status as interested
     * only the toUserId of that request should be able to accept or reject the request
     */
    try {
      const loggedInUser = req.user;
      const status = req.params.status;
      const userId = req.params.userId;
      if (!["accepted" , "rejected"].includes(status.toLowerCase())) {
        res.status(400).send("Invalid Status request : " + status);
      }
      const userExist = await ConnectionRequest.findById(userId);
      if (!userExist) {
        res.status(404).send("User Not Found");
      }
      const request =   await ConnectionRequest.findOne({
        fromUserId:userId,
        toUserId : loggedInUser._id,
        status : "interested"
      })
      request.status = status;
      const data  = await request.save();
      res.json({message : "request "+status , data : data});

    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

module.exports = requestRouter;
