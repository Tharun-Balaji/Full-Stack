
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: 50,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        minlength: 3,
        maxlength: 50,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
    }
});

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.getName = function () {
    return this.name;
};

UserSchema.methods.createJWT = function () {
    return jwt.sign({
        userId: this._id,
        name: this.name,
    }, "jwtSecret", {
        expiresIn: "30d",  // 30 day
    });
};


module.exports = mongoose.model('User', UserSchema);