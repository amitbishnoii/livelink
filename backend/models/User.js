import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema ({
    firstName: String,
    lastName: String,
});

export default mongoose.model("User", userSchema);