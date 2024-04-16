import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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

export function login(request, response) {
  console.log("login User");
}

export function logout(request, response) {
  console.log("logout User");
}
