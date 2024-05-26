
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
// const { BadRequestError } = require("../errors");


const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{name:user.getName()},token});
};

const login = (req, res) => {
    res.send("Login User");
};

module.exports = {
    register,
    login
};