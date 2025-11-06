import User from "../models/User.js"
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
            res.json({ userDetails: user, message: "User created!", success: true })
        }
    } catch (error) {

    }
}

export const updateUser = async (req, res) => {
    try {
        const { username, bio } = req.body;
        const { emailID } = req.body;
        const userExist = await User.findOne({ email: emailID });
        if (userExist) {
            await User.findOneAndUpdate({email: emailID}, {
                bio: bio,
                username: username,
            })
            res.json({ message: "User updated!", success: true })
        }
        else {
            res.json({ message: "User not found!", success: false, emailas: emailID })
        }
    } catch (error) {
        res.json({ message: "server error", error: error, success: false})
    }
}