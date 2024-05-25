// check username, password in post(login) request
// if exist create new JWT
// send back to frontend

// setup authentication so only the request with JWT can access the dashboard

const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
    // console.log(req)
    const { username, password } = req.body;
    // console.log(username,password);

    // mongo
    //JOI
    // check in controller 

    if (!username || !password) {
        throw new CustomAPIError("Please enter a username and password", 400);
    };

    const id = new Date().getDate();

    const token = jwt.sign({ id, username },process.env.JWT_SECRET,{expiresIn: "30d"});

    // console.log(username,password);
    res.status(200).json({
        msg: "user Created",
        token
    })
};

const dashboard = async (req, res) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) { 
        throw new CustomAPIError("No token provided", 401);
    };

    const token = authHeader.split(' ')[1];
    // console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const luckyNumber = Math.floor(Math.random() * 100);
        res.status(200).json({
            msg: `Hello ${decoded.username}`,
            secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
        });
    } catch (error) {
        throw new CustomAPIError("Invalid token", 401);
    }

    
};

module.exports = {
    login,
    dashboard
};

