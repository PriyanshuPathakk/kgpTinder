const express = require("express");
const { userAuth } = require("../../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

userRouter.get("/user/request/pending", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate({
      path: "fromUserId",
      select: "firstName lastName photoUrl about age preferrence gender",
    });
    if (connectionRequests.length == 0) {
      return res
        .status(200)
        .json({ message: "No Pending Requests", count: 0, data: [] });
    }

    res.json({
      message: "Showing Pending Requests",
      count: connectionRequests.length,
      data: connectionRequests,
    });
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate({
        path: "fromUserId",
        select: "firstName lastName age gender photoUrl about preferrence",
      })
      .populate({
        path: "toUserId",
        select: "firstName lastName age gender photoUrl about preferrence",
      });
    if (connections.length == 0) {
      return res.status(200).send({ message: "No connectons available", data: [] });
    }
    const data = connections.map((row) => {
      if (row.fromUserId._id.equals(loggedInUser._id)) {
        return row.toUserId;
      } 
      else return row.fromUserId;
    });
    res.json({data : data});
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 30 ? 30 : limit;
    const skip = (page - 1) * limit;

    const loggedInUser = req.user;
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    });
    const hiddenUser = new Set();
    connectionRequests.forEach((request) => {
      hiddenUser.add(request.fromUserId.toString());
      hiddenUser.add(request.toUserId.toString());
    });
    hiddenUser.add(loggedInUser._id.toString());
    const usersToShow = await User.find({
      _id: { $nin: Array.from(hiddenUser) },
    })
      .select("firstName lastName age gender photoUrl about preferrence")
      .skip(skip)
      .limit(limit);

    res.json({ data: usersToShow });
  } catch (err) {
    res.status(500).send("Server failed");
  }
});

module.exports = userRouter;
