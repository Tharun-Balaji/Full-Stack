
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
// const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = jwt.sign({ UserId: user._id, name: user.name }, "jwtSecret", {
        expiresIn: "30d",
    });
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token});
};

const login = (req, res) => {
    res.send("Login User");
};

module.exports = {
    register,
    login
};