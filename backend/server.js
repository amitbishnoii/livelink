import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cors from "cors"
import authRoute from "./routes/authRoute.js";
import friendRoute from "./routes/friendRoute.js"
import userRoute from "./routes/userRoute.js"
import { Server } from "socket.io";
import http from "http"

dotenv.config()
const app = express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})

app.use(express.json());
app.use(cors());
app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/friends", friendRoute)

connectDB();

io.on("connection", (socket) => {
    let onlineUsers = {}
    console.log("new connection at ", socket.id);

    socket.on("addUser", (userId) => {
        onlineUsers[userId] = socket.id;
        console.log('online users: ', onlineUsers);
    })

    socket.on("sendMessage", ({senderID, recID, Message}) => {
        console.log(`message recieved from ${senderID}, sent to ${recID}, message is ${Message}`);
    })
})

app.get("/", async (req, res) => {
    res.send("hello world")
})

server.listen(port, () => {
    console.log("server listening on port ", port);
})