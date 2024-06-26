
const path = require('path');
const express = require("express");
const app = express();
const cors = require("cors");
const tasks = require("./routes/tasks");
const connectDB = require('./db/connect');
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

// console.log()
//routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

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



