const mongoose = require("mongoose");

mongoose.connect(process.env.mongoDB_url, {});
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Connection to MongoDB is successful");
});