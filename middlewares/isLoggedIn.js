const jwt = require("jsonwebtoken");
const blackListedToken = require("../models/blackListedToken");
const userModel = require("../models/usermodel");

const isLoggedIn = async (req, res, next) => {
    try {
        //Check for Token
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        };

        if (!token) {
            return res.status(404).json({
                status: "error",
                message: "No token was provided"
            });
        }

        //Verify Token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                status: "error",
                message: "Invalid or expired token"
            });
        }

        const { userId, email } = decoded;
        // console.log(decoded);

        //Check if blacklisted
        const tokenIsBlacklisted = await blackListedToken.findOne({ token });
        if (tokenIsBlacklisted) {
            return res.status(403).json({
                status: "error",
                message: "This token has been blacklisted"
            });
        }

        //Find user by id
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "user not found"
            });
        };
        //console.log(user);
        
        //attach user to request
        req.user = user;

        next();

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            status: "error",
            message: "Server error, please try again"
        });
    };
};


module.exports = isLoggedIn;