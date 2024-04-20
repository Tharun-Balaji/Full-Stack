import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export async function signUp(request, response) {
  try {
    const { fullName, username, password, confirmPassword, gender } =
      request.body;

    if (password !== confirmPassword) {
      return response.status(400).send("Passwords do not match");
    }

    const user = await User.findOne({ username });

    if (user) {
      return response.status(400).json("User already exists");
    }

    // Hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "Male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {

        // Generate JWT
        await generateTokenAndSetCookie(newUser._id,response)
      await newUser.save();

      return response.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      return response.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in SignUp controller =>", error.message);
    return response.send(500).json({
      error: "Internal Server Error",
    });
  }
}

export async function login(request, response) {
  // console.log("login User");
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if ( !user || !isPasswordCorrect  ){
      return response.status(400).json({ error: "Invalid username or password" });
    }

    // Generate JWT
    generateTokenAndSetCookie(user._id,response);

    return response.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });



  } catch (error) {
    console.log("Error in Login Controller",error.message);
    return response.send(500).json({
      error: "Internal Server Error",
    });
  }
}

export function logout(request, response) {
  try {
    response.cookie("jwt","",{maxAge:0});
    // response.clearCookie("token");
    return response.status(200).json({
      message: "Successfully logged out",
    });
  } catch (error) {
    console.log("Error in Logout Controller",error.message);
    return response.send(500).json({
      error: "Internal Server Error",
    });
  }
}
