const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email });
    if (user) {
      return;
    }

    const newUser = await User.create({
      Email: Email,
      Password: Password,
    });

    const token = signToken(newUser._id);
    console.log(token);
    return res.status(201).json({
      status: "success",
      token,
      id: newUser._id,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.logIn = async (req, res, next) => {
  const Email = req.body.Email;
  const Password = req.body.Password;

  const user = await User.findOne({ Email }).select("+Password");

  if (!user || !(await user.correctPassword(Password, user.Password))) {
    console.log("i worked");

    return next(res.status(403));
  }

  console.log("i worked again");
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    id: user._id,
    token,
  });
};
