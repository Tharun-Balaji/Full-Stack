import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import { authRoute } from "./routes/index.js";


dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
})

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use("/api/auth", authRoute);

// Error Handling
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

app.listen(PORT, () => {
  console.log("Listening on %i...", PORT);
});
