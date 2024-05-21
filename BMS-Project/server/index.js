const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
require("./config/dbConfig");

const userRoute = require("./Routes/userRoutes");
const movieRoute = require("./Routes/movieRoutes");
const theatreRoute = require("./Routes/theatreRoute");
const bookingRoutes = require("./Routes/bookingRoutes");

app.use(cors());

app.use(express.json());

app.use("/api/user", userRoute);

app.use("/api/movie", movieRoute);

app.use("/api/theatre", theatreRoute);

app.use("/api/bookings",bookingRoutes)

app.listen(8082,()=>{
    console.log("Server is running on port http://localhost:8082/");
});