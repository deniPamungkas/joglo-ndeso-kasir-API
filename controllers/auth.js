import userSchema from "../models/auth.js";
import tokenSchema from "../models/token.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signUp = async (req, res) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const newUser = new userSchema({
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
  } catch (error) {
    return res
      .status(501)
      .json({ message: `email ${error.keyValue.email} sudah terdaftar` });
  }
};

export const login = async (req, res) => {
  const user = await userSchema.findOne({ email: req.body.email });
  try {
    //check if user exist or not exist
    if (user) {
      //if user exist, check password correct or incorrect
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err)
          return res.status(400).json({ message: "login failed", error: err });
        //if password is incorrect
        if (!result) {
          return res
            .status(404)
            .json({ message: "login failed", error: "wrong password" });
          //if password is correct
        } else {
          const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
          const { $__, $isNew, ...val } = user;
          const { password, ...dataUser } = val._doc;
          return res
            .status(200)
            .cookie("accessToken", token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
            })
            .json({ message: "login success", data: dataUser });
        }
      });
    } else {
      return res
        .status(404)
        .json({ message: "login failed", error: "user not found!" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "login failed, internal server error",
      error,
    });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({ message: "user has been loged out" });
};
