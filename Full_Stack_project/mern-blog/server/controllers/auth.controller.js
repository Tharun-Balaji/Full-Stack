import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export async function signUp(req, res, next) {
  // console.log(req.body);

  // get data from req.body
  const { username, email, password } = req.body;

  // check if all fields are filled
  if (!username || !email || !password || username === "" || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
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