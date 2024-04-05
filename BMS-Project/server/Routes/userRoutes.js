
const router = require('express').Router();
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../Middleware/authMiddleware');

router.post("/register", async(request, response) => {
    try {
        const userExists = await User.findOne({ email: request.body.email });
        if (userExists) {
            response.status(403).send(
                {
                    success : false,
                    message : "User already exists"
                }
            )
            return ;
        }

        // Hash the password before Storing the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        request.body.password = hashedPassword;

        const newUser = new User(request.body);
        const savedUser = await newUser.save();

        response.status(200).send({
            success : true,
            message : "User registered successfully, Please Login!"
        })
        
    } catch (error) {
        console.log(error);
        response.status(403).send({
            success : false,
            message : "Something went wrong. Please try again later"
        })
    }
});

router.post("/login", async(request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email });
        if (!user) {
            response.status(401).send(
                {
                    success : false,
                    message : "Invalid Credentials"
                }
            )
            return ;
        }

        const validPassword = await bcrypt.compare(request.body.password, user.password);
        if (!validPassword) {
            response.status(401).send(
                {
                    success : false,
                    message : "Invalid Credentials"
                }
            )
            return ;
        }

        const token = jwt.sign(
          { userId: user._id, emailId: user.email },
          process.env.jwt_secret,
          { expiresIn: "1d" }
        );

        response.status(200).send({
            success : true,
            message : "User logged in successfully",
            data : token
        })

    } catch (error) {
        console.log(error);
        response.status(500).send({
            success : false,
            message : "Something went wrong. Please try again later"
        })
    }
})

router.get("/get-current-user", authMiddleware ,async(request, response) => {
    try{
        const user = await User.findById(request.body.userId).select("-password");
        response.status(200).send({
            success : true,
            message : "User fetched successfully",
            data : user
        })
    }catch (error) {
        response.status(500).send({
            success : false,
            message : "Something went wrong. Please try again later"
        })
    }
})


module.exports = router;