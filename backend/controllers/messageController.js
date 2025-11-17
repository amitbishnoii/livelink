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
        console.log(error);
    }
}