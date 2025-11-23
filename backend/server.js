import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js";
import cors from "cors"
import authRoute from "./routes/authRoute.js";
import friendRoute from "./routes/friendRoute.js"
import userRoute from "./routes/userRoute.js"
import messageRoute from "./routes/messageRoute.js"
import { Server } from "socket.io";
import http from "http"
import { saveMessage } from "./controllers/messageController.js";
import "./config/cloudinary.js"

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
app.use("/message", messageRoute)

connectDB();

const onlineUsers = {}
io.on("connection", (socket) => {
    console.log("new connection at: ", socket.id);

    socket.on("addUser", (userId) => {
        onlineUsers[userId] = socket.id;
        console.log('adduser trigerred');
        socket.broadcast.emit("userConnected", {
            USER: userId
        })
        console.log('online users: ', onlineUsers);
    })

    socket.on("sendMessage", async (data) => {
        const save = await saveMessage(data)
        socket.emit("save-message", {
            status: "ok",
            message: "message saved",
            content: save.content,
        })
        const socketID = onlineUsers[data.recID]
        const socketIDofSender = onlineUsers[data.senderID]
        console.log('receiver socket id: ', socketID);
        console.log('sender socket id: ', socketIDofSender);
        io.to(socketID).emit("receive-message", {
            id: data.senderID,
            content: data.Message,
        })
        io.to(socketIDofSender).emit("receive-message", {
            id: data.senderID,
            content: data.Message,
        })


    })
})

app.get("/", async (req, res) => {
    res.send("hello world")
})

server.listen(port, () => {
    console.log("server listening on port ", port);
})