
const router = require('express').Router();
const { model } = require('mongoose');
const User = require("../models/userModels");

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


module.exports = router;