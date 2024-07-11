
import Verification from "../models/emailVerification.js";
import Users from "../models/userModel.js";
import { compareString } from "../utils/index.js";

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


