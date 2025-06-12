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
      select: "firstName lastName photoUrl",
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
        { fromUserId: loggedInUser, status: accepted },
        { toUserId: loggedInUser, status: accepted },
      ],
    })
      .populate({
        path: "fromUserId",
        select: "firstName lastName age gender photoUrl about",
      })
      .populate({
        path: "toUserId",
        select: "firstName lastName age gender photoUrl about",
      });
    if (connections.length == 0) {
      res.status(200).send({ message: "No connectons available", data: [] });
    }
    const data = connections.map((row) => {
      if (row.fromUserId.equals(loggedInUser._id)) {
        return row.toUserId;
      } else return row.fromUserId;
    });
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
      .select("firstName lastName age gender photoUrl about")
      .skip(skip)
      .limit(limit);

    res.json({ data: usersToShow });
  } catch (err) {
    res.status(500).send("Server failed");
  }
});

module.exports = userRouter;
