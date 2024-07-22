const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt =require ("jsonwebtoken")

const registerUser=async (req, res) => {
    try {
        const { userName, password} = req.body;

        if (!userName || !password) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const isExistingUser = await User.findOne({ userName: userName });
        if (isExistingUser) {
            return res
                .status(409)
                .json({ errorMessage: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            userName,
            password: hashedPassword,
        });

        await userData.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.json({ errorMessage: "something went wrong" });
    }
        };
        
        const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({
                errorMessage: "Bad Request! Invalid credentials",
            });
        }

        const userDetails = await User.findOne({ userName });

        if (!userDetails) {
            return res
                .status(401)
                .json({ errorMessage: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            userDetails.password
        );

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ errorMessage: "Invalid credentials" });
        }

        const token = jwt.sign({
            userId: userDetails._id,
        userName:userDetails.userName}, process.env.SECRET_KEY,{expiresIn:"24h"});

        res.json({
          message: "User logged in",
          token: token,
          userName: userDetails.userName,
          userId: userDetails._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "Something went wrong!" });
    }
};


module.exports = { registerUser ,loginUser};