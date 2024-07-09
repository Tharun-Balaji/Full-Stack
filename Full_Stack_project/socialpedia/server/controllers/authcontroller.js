import Users from '../models/userModel.js';
import { hashString } from '../utils/index.js';
import { sendVerificationEmail } from '../utils/sendEmail.js';

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate Fields
  if (!firstName || !lastName || !email || !password) { 
    next("Provide Required Fields");
    return;
  }

  try {

    // Check if user exists
    const userExists = await Users.findOne({ email });
    if (userExists) {
      next("User Already Exists");
      return;
    }

    // Hash Password
    const hashedPassword = await hashString(password);

    // Create User
    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Send email Verification to User
    sendVerificationEmail(user, res);

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
 };
