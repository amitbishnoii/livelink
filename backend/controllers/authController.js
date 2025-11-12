import User from "../models/User.js"
import Friends from "../models/Friends.js"
import bcrypt from "bcrypt"

export const registerUser = async (req, res) => {
    try {
        const { userName, password, firstName, lastName, email } = req.body
        const emailExist = await User.findOne({ email: email });
        const userExist = await User.findOne({ userName: userName });
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

export const updateUser = async (req, res) => {
    try {
        const { username, bio, dob } = req.body;
        const { emailID } = req.body;
        const userExist = await User.findOne({ email: emailID });
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
        const { username } = req.body;
        const user = await User.findOne({ userName: username });
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