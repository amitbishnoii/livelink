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

export const addFriends = async (req, res) => {
    try {
        const { sender_id, rec_id } = req.body;
        const sender = await User.findOne({ _id: sender_id });
        const sender_friends = await Friends.findOne({ user: sender_id });
        const reciever = await User.findOne({ _id: rec_id });

        if (sender_friends.friendList.includes(rec_id)) {
            res.json({ message: "Both user are already friends!", success: null });
        } else if (sender_id === rec_id) {
            res.json({ message: "Both IDs are Same!", success: false });
        } else if (!sender || !reciever) {
            res.json({ message: "User Dosen't Exist!", success: false });
        } else {
            const add_friend = await Friends.findOneAndUpdate({ user: sender_id }, {
                $addToSet: { friendList: rec_id }
            })
            res.json({ message: "friend added!", info: add_friend, success: true })
        }
    } catch (error) {
        res.json({ message: error, success: false })
    }
}