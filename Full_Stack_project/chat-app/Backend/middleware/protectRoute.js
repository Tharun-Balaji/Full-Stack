import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export default async function protectRoute(request, response, next) {
    try {
        const token = request.cookies.jwt;
        if (!token) {
            return response.status(401).json({
                error: "Unauthorized - No Token provided",
            });
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if (!decoded){
            return response.status(401).json({
                error: "Unauthorized - Invalid Token"
            });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return response.status(401).json({
                error: "User not found"
            });
        }

        request.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute Controller",error.message);
        response.status(500).json({
            error: "Internal Server Error",
        })
    }
}