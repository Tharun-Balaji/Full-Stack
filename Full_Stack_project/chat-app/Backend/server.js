import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./models/message.model.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


// app.get("/", (req, res) => {
//     // root route for http://localhost:5000/
//     res.send('Hello World!');
// })

app.listen(PORT, function () {
  connectToMongoDB();
  console.log(`Server listening on port ${PORT}`);
});
