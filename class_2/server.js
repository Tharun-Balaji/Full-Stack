
// Import the Express module
const express = require('express');
console.log(express);

// Create an Express application
const app = express();
console.log(app);

const loggerMiddleware = (req,res,next)=>{
    // console.log("I am a logger middleware");   
    console.log(req.ip,req.hostname,req.method, req.url);
    const date = new Date();
    console.log(date);
    next(); 
}

const auth = (req,res,next)=>{
    console.log(req.query);
    const password = req.query.pass;
    console.log(password);
    if(password === '123'){
        next();
    }else{
        res.send("You are not the authorized person for the requested url");
    }
}

app.use(express.static('public')) // it will serve index.html file on the '/' get request

//register loggerMiddleware globally for all the routes
app.use(loggerMiddleware);
// app.use(auth);

app.get("/", (req, res) => {
//   res.send("<h2>Hello World!</h2>");
    res.send(
        {
            type:"GET"

        }
    )
});

app.post("/", function(req, res) {
    res.send({type:"POST"});
});

app.put("/", function(req, res) {
    res.send({type:"PUT"});
});

app.delete("/", function(req, res) {
    res.send({type:"DELETE"});
});




app.get("/about", (req, res) => {
    res.send("Welcome")
})

app.post("/about", (req, res) => {
    res.send("Welcome POST request made!")
});

app.post('/data',auth,(req,res)=>{
    res.send("Received a POST req");
})

app.listen(3003, () => {
  console.log("Example app listening on port 3000!");
});