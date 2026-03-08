import mongoose from 'mongoose';

const { Schema } = mongoose;

const blockSchema = new Schema({
    blocked_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    blocker_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

export default mongoose.model("block", blockSchema);