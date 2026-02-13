import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const getUser = async (req, res) => {
    try {
        const { username } = req.params;
        const info = await User.findOne({ userName: username }).select("-password -__v");
        if (!info) {
            res.json({ message: "User not found!", success: false })
        }
        else {
            res.json({ message: "User Found!", ID: info._id, userINFO: info, success: true })
        }
    } catch (error) {
        res.json({ message: "server error", error: error, success: false })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { username, bio, dob, emailID } = req.body;

        const userExist = await User.findOne({ email: emailID }).select("-password -__v");
        let pic_url = null

        console.log('file we got here is: ', req.file);
        console.log('user we got: ', userExist);
        if (req.file) {
            const upload = cloudinary.uploader.upload(req.file.path, {
                folder: "profile_pictures"
            })
            pic_url = (await upload).secure_url
            if (userExist) {
                const asdf = await User.findOneAndUpdate({ email: emailID }, {
                    $set: {
                        bio: bio,
                        userName: username,
                        DOB: dob,
                        profilePic: pic_url,
                    }
                })
                console.log('use created in the backend!');
                res.json({ message: "User updated!", success: true, profilepicURL: asdf.profilePic })
            }
            else {
                res.json({ message: "User not found!", success: false })
            }
        }
        else {
            res.json({ message: "file not found!", success: false })
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