import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const protectRoute = async () => {
    try {
        const token = req.cookie.jwt;

        if (token) {
            return res.status(401).json({
                message: "Unauthorized user Access. No token provided."
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded) {
            return res.status(401).json({
                message: "Unauthorized user Access. No token provided."
            })
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            })
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in protededRoute middleware", error.message);
        res.status(500).json({
            Message: "Internal server error"
        })
    }
}
