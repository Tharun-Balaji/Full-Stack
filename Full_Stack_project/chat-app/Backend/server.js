import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import protectRoute from "./middleware/protectRoute.js";
import userRoutes from "./routes/user.routes.js"


import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages",protectRoute, messageRoutes);
app.use("/api/users",protectRoute, userRoutes);




server.listen(PORT, function () {
  connectToMongoDB();
  console.log(`Server listening on port ${PORT}`);
});
