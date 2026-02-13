import User from "../models/User.js"
import Friends from "../models/Friends.js"
import bcrypt from "bcrypt"

export const registerUser = async (req, res) => {
    try {
        const { userName, password, firstName, lastName, email } = req.body
        const emailExist = await User.findOne({ email: email }).select("-password -__v");
        const userExist = await User.findOne({ userName: userName }).select("-password -__v");
        if (userExist) {
            res.json({ message: "Username already taken!", success: false })
        } else if (emailExist) {
            res.json({ message: "Email already taken!", success: false })
        } else {
            const user = new User({
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                password: password,
                email: email
            });
            const newuser = await user.save()
            const friendList = new Friends({
                user: user._id,
            })
            const newfriendList = await friendList.save();
            res.json({ userDetails: user, friends: newfriendList, message: "User created!", success: true })
        }
    } catch (error) {

    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ userName: username });
        if (!user) {
            res.json({ message: "Username not Found!", success: false })
        } else {
            if (user.password === password) {
                res.json({ message: "Login Success", Username: user.userName, success: true })
            } else {
                res.json({ message: "Wrong Password!", success: false })
            }
        }
    } catch (error) {
        res.json({ message: "server error", error: error, success: false })
    }
}
