import Friends from "../models/Friends.js";
import User from "../models/User.js";

export const addFriends = async (req, res) => {
    try {
        const { sender_id, rec_id } = req.body;
        const sender = await User.findOne({ _id: sender_id });
        const sender_friends = await Friends.findOne({ user: sender_id });
        const reciever = await User.findOne({ _id: rec_id });
        console.log(sender_friends);

        if (sender_friends.friendList.includes(rec_id)) {
            res.json({ message: "Both user are already friends!", success: null });
        }
        else if (sender_id === rec_id) {
            res.json({ message: "Both IDs are Same!", success: false });
        }
        else if (!sender || !reciever) {
            res.json({ message: "User Dosen't Exist!", success: false });
        }
        else {
            const add_friend = await Friends.findOneAndUpdate({ user: sender_id }, {
                $addToSet: { friendList: rec_id }
            })
            res.json({ message: "friend added!", info: add_friend, success: true })
        }
    } catch (error) {
        res.json({ message: "server error: " + error, success: false })
    }
}

export const getFriends = async (req, res) => {
    try {
        const { ID } = req.params;
        const friends = await Friends.findOne({ user: ID }).populate("friendList")
        if (friends) {
            res.json({ list: friends.friendList, success: true })
        }
        else {
            res.json({ message: "User not found!", success: false })
        }
    } catch (error) {
        res.json({ message: "server error: " + error, success: false })
    }
}