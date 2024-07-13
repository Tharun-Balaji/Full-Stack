import express from "express";
import path from "path";
import { changePassword, requestPasswordReset, resetPassword, verifyEmail } from "../controllers/userController.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

// email verification route
router.get("/verify/:userId/:token", verifyEmail);

// reset password route
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/request-passwordreset", requestPasswordReset);
router.post("/reset-password", changePassword);

router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "index.html"));
});

router.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "index.html"));
});



export default router;