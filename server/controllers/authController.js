import User from "../models/User.js"
import Friends from "../models/Friends.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const registerUser = async (req, res) => {
    try {
        const { userName, password, firstName, lastName, email } = req.body;
        const emailExist = await User.findOne({ email: email }).select("-password -__v");
        const userExist = await User.findOne({ userName: userName }).select("-password -__v");
        if (userExist) {
            res.json({ message: "Username already taken!", success: false });
        } else if (emailExist) {
            res.json({ message: "Email already taken!", success: false });
        } else {
            const user = new User({
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                password: password,
                email: email
            });
            const newuser = await user.save();
            const friendList = new Friends({
                user: user._id,
            });
            const newfriendList = await friendList.save();
            res.json({ userDetails: newuser, friends: newfriendList, message: "User created!", success: true });
        }
    } catch (error) {
        res.json({ message: "server error", error: error.message, success: false });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('payload: ', req.body);
        const user = await User.findOne({ userName: username });
        if (!user) {
            res.json({ message: "Username not Found!", success: false });
        } else {
            if (user.password === password) {
                const payload = {
                    username: user.userName,
                    ID: user._id,
                };
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN);
                res.json({ message: "Login Success", token: accessToken, Username: user.userName, success: true });
            } else {
                res.json({ message: "Wrong Password!", success: false });
            }
        }
    } catch (error) {
        res.json({ message: "server error", error: error.message, success: false });
    }
}
