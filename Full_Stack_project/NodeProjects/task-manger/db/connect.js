const mongoose = require("mongoose");

// const connectionString =
//   "mongodb+srv://tharunbalaji110:ar05GpGLPiiKp1aF@cluster0.ve6vvkl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  function connectDB(url) {
    return mongoose.connect(url)
  }

module.exports = connectDB;
