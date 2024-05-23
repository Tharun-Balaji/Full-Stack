
require("dotenv").config();
require("express-async-errors");
//async errors

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productRouter = require("./routes/products");

const notFound = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");


//middleware
app.use(express.json());


//routes
app.get("/", (req, res) => {
    res.send("<h1>Store API </h1> <a href = '/api/v1/products' >product routes</a>");
});

app.use("/api/v1/products",productRouter);

//products routes


app.use(notFound);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        //connect to the DB
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT,console.log(`Server is listening at ${PORT}...`));
    } catch (error) {
        console.log(error);
    }
}; 
 
start();
