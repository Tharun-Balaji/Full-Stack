
import jwt from "jsonwebtoken";

export default function generateTokenAndSetCookie(userId,response){
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "1d",
    })

    response.cookie("jwt",token,{
        maxAge: 1 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });
}