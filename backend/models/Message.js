import mongoose from "mongoose";
const {Schema} = mongoose;

const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
});

export default mongoose.model("Messages", messageSchema)