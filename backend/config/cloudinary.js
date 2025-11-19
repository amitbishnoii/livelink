import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const url = cloudinary.url("setup_qhymei.jpg", {
    transformation: [
        { fetch_format: "auto" }
    ]
})

console.log(url);

export default cloudinary;