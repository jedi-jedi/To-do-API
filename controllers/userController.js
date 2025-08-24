const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListedTokenModel = require("../models/blackListedToken");

//SIGN-UP
const signup = async (req, res)=>{
    const { password } = req.body; 

    try {
        //Generate salt for hashing password
        const salt = await bcrypt.genSalt(10);

        //Hash the Password
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({...req.body, password: hashedPassword});
        const result = {
            name: user.name,
            email: user.email
        }

        if(!user)  {
            return res.status(404).json({
                status: "error",
                message: "Unable to create user"
            });
        }

        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            user: result
        });

    } catch (error) {
        console.log(error, error.message);
        
    }
}


//SIGN-IN
const signin = async (req, res) => {
    
    
    const { email, password } = req.body;


    try {
        //verify email
        const user =  await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Email or password incorrect"
            });
        };

        //verify password
        const isMatch = await bcrypt.compare(password,  user.password);
        if (!isMatch) {
            return res.status(404).josn({
                status: "error",
                message: "Email or password or incorrect"
            });
        };

        //Generate Access Token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        return res.status(200).json({
            status: "success",
            message: "Login successful",
            user,
            token
        });

    } catch (error) {
        console.log(error, error.message);
        
    };
};

//LOGOUT
const logout = async (req, res) => {
    // console.log("logout req.body", req.body);
    
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({
            status: "error",
            message:"Token is required"
        });
    }

    try {
        await blackListedTokenModel.create({ token });
        return res.status(200).json({
            status: "success",
            message: "Logout successful."
        });
    } catch (error) {
        console.log(error, error.message);
        
    };
};

module.exports = {
    signup,
    signin,
    logout
}