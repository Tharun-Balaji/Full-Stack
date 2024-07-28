import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export async function signUp(req, res) { 
  // console.log(req.body);

  // get data from req.body
  const { username, email, password } = req.body;

  // check if all fields are filled
  if (!username || !email || !password || username === "" || email === "" || password === "") {
    return res.status(400).json({
      message: "All fields are required"
    })
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
    console.log(error);
    return res.status(500).json({
      message: error.message
    });
  }
};