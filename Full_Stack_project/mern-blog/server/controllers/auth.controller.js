import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export async function signUp(req, res, next) {
  // console.log(req.body);

  // get data from req.body
  const { username, email, password } = req.body;

  // check if all fields are filled
  if (!username || !email || !password || username === "" || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
    return;
  };

  // hash password
  const hashedPassword = await bcryptjs.hash(password, 10);

  // create new user
  const newUser = new userModel({
    username,
    email,
    password: hashedPassword
  });

  try {
    // save user
    await newUser.save();

    // return response
    return res.status(201).json({
      message: "User created successfully"
    });
  } catch (error) {
    next(error);
  }
};


export async function signIn(req, res, next) { 

  // get data from req.body
  const { email, password } = req.body;

  //check if all fields are filled
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
    return;
  };

  try {
    
    // find user
    const validUser = await userModel.findOne({ email });

    // if not valid user
    if (!validUser) {
      next(errorHandler(404, "User not found"));
      return;
    };

    // check password
    const validPassword = await bcryptjs.compare(password, validUser.password);

    // if not valid password
    if (!validPassword) {
      next(errorHandler(401, "Invalid password"));
      return;
    };

    // create token
    const token = jwt.sign({
      id: validUser._id,
    }, process.env.JWT_SECRET);

    // delete password
    validUser.password = undefined;

    // send response
    return res.status(200).cookie("access_token", token, { // set cookie
      httpOnly: true // only accessible by web server
    }).json(validUser)

  } catch (error) {
    next(error);
  }

};