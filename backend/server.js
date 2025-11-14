import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cors from "cors"
import authRoute from "./routes/authRoute.js";
import friendRoute from "./routes/friendRoute.js"
import userRoute from "./routes/userRoute.js"

dotenv.config()
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/friends", friendRoute)


connectDB();

app.get("/", async (req, res) => {
    res.send("hello world")    
})

app.listen(port, () => {
    console.log('app listening on port ', port);
})