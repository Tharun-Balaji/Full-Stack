const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
require("./config/dbConfig");

const userRoute = require("./Routes/userRoutes");

app.use(cors());

app.use(express.json());

app.use("/", userRoute);

app.listen(8082,()=>{
    console.log("Server is running on port http://localhost:8082/");
});