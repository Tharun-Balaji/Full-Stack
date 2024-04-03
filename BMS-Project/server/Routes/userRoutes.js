
const router = require('express').Router();
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");

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


module.exports = router;