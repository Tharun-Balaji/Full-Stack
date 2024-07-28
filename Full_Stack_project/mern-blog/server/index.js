import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoute from "./routes/auth.route.js";

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

app.use("/api/auth", authRoute)

app.listen(PORT, () => {
  console.log("Listening on %i...", PORT);
});
