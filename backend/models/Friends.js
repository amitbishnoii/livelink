import mongoose from "mongoose";

const {Schema} = mongoose;

const friendSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    friendList: [],
})

export default mongoose.model("friends", friendSchema);