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
            res.json({user, message: "User created!", success: true })
        }
    } catch (error) {

    }
}