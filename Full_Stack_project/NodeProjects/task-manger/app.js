
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require('./db/connect');
require("dotenv").config();
const PORT = 3000;

//middleware
app.use(express.json());

//routes
app.get("/hello", function (req, res) {
  res.send("Hello World!");
});


app.use("/api/v1/tasks",tasks);

/*
 * app.get("/api/v1/tasks")         -- get all the tasks
 * app.post("/api/v1/tasks")        -- create a new task
 * app.get("/api/v1/tasks/:id")     -- get single task
 * app.patch("/api/v1/tasks/:id")   -- update task
 * app.delete("/api/v1/tasks/:id")  -- delete task
*/

async function start(){
  // console.log(process.env.MONGO_URI);
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, function () {
      console.log(`Server listening on ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};


start();



