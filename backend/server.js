import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cors from "cors"
import authRoute from "./routes/authRoute.js";

dotenv.config()
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/user", authRoute)


connectDB();

app.get("/", async (req, res) => {
    res.send("hello world")    
})

app.listen(port, () => {
    console.log('app listening on port ', port);
})