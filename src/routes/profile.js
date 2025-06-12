const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../../middlewares/auth.js");
const { validateReqBody } = require("../../utils/validateUser.js");

profileRouter.get("/profile", userAuth, async (req, res) => {
  const user = req.user;
  res.json({message : "Welcome" , data : user});
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    // Validating the request body
    const isEditableField = validateReqBody(req);
    if (isEditableField) {
      const user = req.user;
      Object.keys(req.body).forEach((key) => {
        user[key] = req.body[key];
      });
      await user.save();
      res.json({ message: "Updated Successfully", data: user });
    } else {
      throw new Error("The field cannot be edited");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
