import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    bio : {
        type: String,
    },
    DOB: {
        type: Date,
    },
    profilePic: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

export default mongoose.model("User", userSchema);