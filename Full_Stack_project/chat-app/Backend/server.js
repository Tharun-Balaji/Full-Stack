import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import protectRoute from "./middleware/protectRoute.js";
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages",protectRoute, messageRoutes);
app.use("/api/users",protectRoute, userRoutes);


// app.get("/", (req, res) => {
//     // root route for http://localhost:5000/
//     res.send('Hello World!');
// })

app.listen(PORT, function () {
  connectToMongoDB();
  console.log(`Server listening on port ${PORT}`);
});
