
import Verification from "../models/emailVerification.js";
import Users from "../models/userModel.js";
import { compareString, hashString } from "../utils/index.js";
import { resetPasswordLink } from "../utils/sendEmail.js";
import PasswordReset from './../models/PasswordReset.js';
import FriendRequest from './../models/friendRequest';

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

  try {
    // get user id and password
    const { userId, password } = req.body;

    // hash password
    const hashedPassword = await hashString(password);

    // update password
    const user = await Users.findByIdAndUpdate(
      { _id: userId },
      { password: hashedPassword }
    );

    // if user found
    if (user) {
      await PasswordReset.findOneAndDelete({ userId });

      // redirect
      const message = "Password changed successfully";
      return res.redirect(
        `/users/resetpassword?status=success&message=${message}`
      );
      return;
    }

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res, next) => {

  try {
    // get user id
    const { userId } = req.body.user;
    const { id } = req.params;

    // get user
    const user = await Users.findById(id ?? userId).populate({
      path: "friends",
      select: "-password",
    });

    // if user not found
    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }
    
    // set password to undefined
    user.password = undefined;

    // send response
    res.status(200).json({
      success: true,
      user: user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }

};

export const updateUser = async (req, res, next) => {

  try {

    // get profile data
    const { firstName, lastName, location, profileUrl, profession } = req.body;

    // check if all required fields are provided
    if (!(firstName || lastName || contact || profession || location)) {
      next("Please provide all required fields");
      return;
    }

    // get user id
    const { userId } = req.body.user;

    // create user object
    const updateUser = {
      firstName,
      lastName,
      location,
      profileUrl,
      profession,
      _id: userId,
    };

    // update user
    const user = await Users.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });

    // populate friends
    await user.populate({ path: "friends", select: "-password" });
    
    // create JWT token
    const token = createJWT(user?._id);

    // set password to undefined
    user.password = undefined;

    // send response
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }

};
 
export const friendRequest = async (req, res, next) => {
  try {

    // get user id
    const { userId } = req.body.user;

    // get request to
    const { requestTo } = req.body;

    // check if friend request already exists
    const requestExist = await FriendRequest.findOne({
      requestFrom: userId,
      requestTo,
    });

    // if friend request already exists
    if (requestExist) {
      next("Friend Request already sent.");
      return;
    }

    // check if there is an active friend request from requestTo
    const accountExist = await FriendRequest.findOne({
      requestFrom: requestTo,
      requestTo: userId,
    });

    // if friend request already exists
    if (accountExist) {
      next("Friend Request already sent.");
      return;
    }

    // create friend request
    const newRes = await FriendRequest.create({
      requestTo,
      requestFrom: userId,
    });

    // send response
    res.status(201).json({
      success: true,
      message: "Friend Request sent successfully",
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
}
 


