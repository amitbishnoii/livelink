import Message from "../models/Message.js";

export const saveMessage = async (data) => {
    try {
        const msg = await Message.create({
            sender: data.senderID,
            receiver: data.recID,
            content: data.Message
        })
        return msg.toJSON()
    } catch (error) {
        res.json({ message: error, success: false })
    }
}

export const getMessage = async (req, res) => {
    try {
        const { senderID, recID } = req.params;
        const chat = await Message.find({
            $or: [
                { sender: senderID, receiver: recID },
                { sender: recID, receiver: senderID },
            ]
        }).select("content date")
            .sort({ date: 1 })
        res.json({ messages: chat, success: true })
    } catch (error) {
        res.json({ message: error, success: false })
    }
}