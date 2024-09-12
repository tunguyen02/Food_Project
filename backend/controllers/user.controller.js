import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import dotenv from 'dotenv';
dotenv.config();


const userController = {
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Email or password is incorrect"
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Email or password is incorrect"
                });
            }
            const token = userController.createToken(user._id);
            res.json({
                success: true,
                token
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error",
                error: error.message
            });
        }
    },
    createToken: (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET)
    },

    registerUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const exists = await UserModel.findOne({ email });
            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                });
            }
            if (!validator.isEmail(email)) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter a valid email"
                });
            }
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter a strong password"
                });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await UserModel.create({
                name,
                email,
                password: hashedPassword
            });

            const token = userController.createToken(newUser._id);
            res.json({
                success: true,
                token
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error",
                error: error.message
            });
        }
    },
}

export default userController;