import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const getUser = async (req, res) => {
    try {
        const { username } = req.params;
        const info = await User.findOne({ userName: username });
        if (!info) {
            res.json({ message: "User not found!", success: false })
        }
        else {
            res.json({ message: "User Found!", ID: info._id, success: true })
        }
    } catch (error) {
        res.json({ message: "server error", error: error, success: false })
    }
}

export const uploadPic = async (req, res) => {
    try {
        const { pic } = req.file;
    } catch (error) {
        res.json({ message: "server error", error: error, success: false })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { username, bio, dob } = req.body;
        const { emailID } = req.body;
        const userExist = await User.findOne({ email: emailID }).select("-password -__v");
        if (userExist) {
            await User.findOneAndUpdate({ email: emailID }, {
                $set: {
                    bio: bio,
                    userName: username,
                    DOB: dob,
                }
            })
            res.json({ message: "User updated!", success: true })
        }
        else {
            res.json({ message: "User not found!", success: false })
        }
    } catch (error) {
        res.json({ message: "server error", error: error, success: false })
    }
}

export const searchUser = async (req, res) => {
    try {
        const { username } = req.query;
        const user = await User.findOne({ userName: username }).select("-password -__v");
        if (!user) {
            res.json({ message: "User not found!", success: false })
        }
        else {
            res.json({ userInfo: user, success: true })
        }
    } catch (error) {
        res.json({ message: error, success: false })
    }
}