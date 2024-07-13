import express from "express";
import path from "path";
import {
  changePassword,
  getUser, requestPasswordReset, resetPassword, updateUser, verifyEmail
} from "../controllers/userController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

// email verification route
router.get("/verify/:userId/:token", verifyEmail);

// reset password route
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/request-passwordreset", requestPasswordReset);
router.post("/reset-password", changePassword);


// user routes
router.post("/get-user/:id?", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);

router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "index.html"));
});

router.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "index.html"));
});



export default router;