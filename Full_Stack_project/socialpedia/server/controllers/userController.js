
import Verification from "../models/emailVerification.js";
import Users from "../models/userModel.js";
import { compareString } from "../utils/index.js";
import { resetPasswordLink } from "../utils/sendEmail.js";
import PasswordReset from './../models/PasswordReset.js';

export const verifyEmail = async (req, res) => {
  console.log("verifyEmail");

  // check if user exists
  const { userId, token } = req.params;

  try {
    const result = await Verification.findOne({ userId });

    if (result) { // user exists

      const { expiresAt, token: hashedToken } = result;

      // token has expired
      if (expiresAt < Date.now()) {
        await Verification.findOneAndDelete({ userId }) // delete verification token
          .then(() => {  // delete user
            Users.findOneAndDelete({ _id: userId })
              .then(() => {  // redirect
                const message = "Verification token has expired.";
                res.redirect(`/users/verified?status=error&message=${message}`);
              })
              .catch((err) => { // redirect
                res.redirect(`/users/verified?status=error&message=`);
              });
          })
          .catch((error) => { // redirect
            console.log(error);
            res.redirect(`/users/verified?message=`);
          });

      } else {
        // check if token is valid
        compareString(token, hashedToken)
          .then((isMatch) => {
            if (isMatch) { // token is valid
              Users.findOneAndUpdate({ _id: userId }, { verified: true }) // update user
                .then(() => { // delete verification token
                  Verification.findOneAndDelete({ userId }).then(() => { // redirect
                    const message = "Email verified successfully";
                    res.redirect(
                      `/users/verified?status=success&message=${message}`
                    );
                  });
                })
                .catch((err) => { // redirect
                  console.log(err);
                  const message = "Verification failed or link is invalid";
                  res.redirect(
                    `/users/verified?status=error&message=${message}`
                  );
                });
            } else {
              // invalid token
              const message = "Verification failed or link is invalid";
              res.redirect(`/users/verified?status=error&message=${message}`);
            }
          })
          .catch((err) => {
            console.log(err);
            res.redirect(`/users/verified?message=`);
          })
      }

    } else { // verification link is invalid
      const message = "Invalid verification link. Try again later.";
      res.redirect(`/users/verified?status=error&message=${message}`);
    }
  } catch (error) {
    console.log(err);
    res.redirect(`/users/verified?message=`);
  }

};

export const requestPasswordReset = async (req, res) => { 
  
  try {
    
    const { email } = req.body;

    // check if email exists
    const user = await Users.findOne({ email });

    // if user not found
    if (!user) { 
      return res
        .status(404)
        .json({
          status: "FAILED",
          message: "Email address not found"
        });
    }

    // check if user has already requested a password reset
    const existingRequest = await PasswordReset.findOne({ email });

    if (existingRequest) { 
      if (existingRequest.expiresAt > Date.now()) {
        return res.status(201).json({
          status: "PENDING",
          message: "Reset password link has already been sent tp your email.",
        });
      }
      await PasswordReset.findOneAndDelete({ email });
    }

    // send password reset link
    await resetPasswordLink(user, res);

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


export const resetPassword = async (req, res) => {

  // get user id and token
  const { userId, token } = req.params;

  try {
    // find record
    const user = await Users.findById(userId);

    // if user not found
    if (!user) {
      const message = "Invalid password reset link. Try again";
      res.redirect(`/users/resetpassword?status=error&message=${message}`);
    }

    // find record in db
    const resetPassword = await PasswordReset.findOne({ userId });

    // if record not found
    if (!resetPassword) {
      const message = "Invalid password reset link. Try again";
      return res.redirect(
        `/users/resetpassword?status=error&message=${message}`
      );
    }

    // get hashed token and expiresAt
    const { expiresAt, token: resetToken } = resetPassword;

    // if token has expired
    if (expiresAt < Date.now()) {
      const message = "Reset Password link has expired. Please try again";
      res.redirect(`/users/resetpassword?status=error&message=${message}`);
    } else { // if token is valid

      // check if token is valid
      const isMatch = await compareString(token, resetToken);

      if (!isMatch) { // invalid token
        const message = "Invalid reset password link. Please try again";
        res.redirect(`/users/resetpassword?status=error&message=${message}`);
      } else { // token is valid
        res.redirect(`/users/resetpassword?type=reset&id=${userId}`);
      }
    }

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}

export const changePassword = async (req, res) => {
  
 };


