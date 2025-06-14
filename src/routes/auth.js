const User = require("../models/user.js");
const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const { userAuth } = require("../../middlewares/auth.js");
const { validateUser } = require("../../utils/validateUser.js");
const validator = require("validator");

authRouter.post("/signUp", async (req, res) => {
  try {
    //user data validation
    validateUser(req);
    const { firstName, lastName, password, gender, preferrence, emailID, age } =
      req.body;

    // Password Encryption
    const passwordHash = await bcrypt.hash(password, 10);

    // creating an instance of user model
    const user = new User({
      firstName,
      lastName,
      password: passwordHash,
      gender,
      preferrence,
      emailID,
      age,
    });

    await user.save();
    res.send("User added succesfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;
    if (!validator.isEmail(emailID)) {
      throw new Error("Please Enter a valid Email ID");
    }
    const user = await User.find({ emailID: emailID });
    if (user.length === 0) {
      throw new Error("Invalid Credentials");
    }
    const passwordMatch = await user[0].passwordCheck(password);
    if (!passwordMatch) {
      throw new Error("Invalid Credentials");
    } else {
      // JWT creation
      const token = await user[0].getJwtToken();
      // Pass the token to the user
      res.cookie(
        "token",
        token,
        { maxAge: 7 * 24 * 60 * 60 * 1000 } /* 7 days in milliseconds */
      );
      res.json({message : "Logged in successfully" , data : user});
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  const cookie = res.cookie("token", null, { maxAge: 0 });
  res.send("Logged out");
});

module.exports = authRouter;
