// import models from "../database/model/index.js";
import User from "../Model/USER";
import { hashPassword, comparePassword } from "../utils/bycrypt.js";
import jwt from "jsonWebToken";

export const userSignUp = async (req, res, next) => {
  const errorresponse = {
    message: "Please enter fill all the details",
    response: {},
  };
  try {
    // js desctructire
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json(errorresponse);
    }

    if (password.length < 7) {
      return res.status(400).json({
        ...errorresponse,
        message: "Password must be at least 8 character",
      });
    }

    let emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let result1 = emailregex.test(email);
    if (!result1) {
      return res
        .status(400)
        .json({ ...errorresponse, message: "Please enter a valid email" });
    }

    // db validation ..> email , db already exist  if 400
    const emailExists = await User.findOne({ email }).exec();
    if (emailExists) {
      return res.status(400).json({
        ...errorresponse,
        message: "This email has been already used, please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    try {
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();
      res.status(201).json({
        ...errorresponse,
        message: "Sign up succeffully",
        response: user,
      });
    } catch (e) {
      return res.status(400).send("Register error. Try again.");
    }
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

export const userLogin = async (req, res) => {
  const responseObj = {
    response: {},
    message: "Please Enter All Fields",
  };
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(responseObj);
    }
    let emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let result1 = emailregex.test(email);
    if (!result1) {
      return res
        .status(400)
        .json({ ...responseObj, message: "Please enter a valid email" });
    }
    if (password.length < 7) {
      return res.status(400).json({
        ...responseObj,
        message: "Password must be at least 8 digits",
      });
    }
    const userExists = await User.findOne({ email }).exec();
    if (!userExists) {
      return res
        .status(401)
        .json({ ...responseObj, message: "Please enter a valid email" });
    }
    const compareedPassword = await comparePassword(
      password,
      userExists.password
    );
    if (!compareedPassword) {
      return res
        .status(401)
        .json({ ...responseObj, message: "Please enter a valid password" });
    }
console.log(userExists)
    const token = jwt.sign(
      { _id: userExists?._id },
      process.env.JWTSECRET,
      {
        expiresIn: "24h",
      }
    );
    res.cookie("user_token", token, {
      httpOnly: true,
    });
    userExists.password = undefined;

    res.json({
      ...responseObj,
      message: "Login Successful",
      response: userExists,
      token: token,
    });
  } catch (exception) {
    console.log(exception);
  }
};
