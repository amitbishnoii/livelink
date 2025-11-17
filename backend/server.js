import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cors from "cors"
import authRoute from "./routes/authRoute.js";
import friendRoute from "./routes/friendRoute.js"
import userRoute from "./routes/userRoute.js"
import { Server } from "socket.io";
import http from "http"
import { saveMessage } from "./controllers/messageController.js";

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

const onlineUsers = {}
io.on("connection", (socket) => {
    console.log("new connection at ", socket.id);

    socket.on("addUser", (userId) => {
        onlineUsers[userId] = socket.id;
        console.log('adduser trigerred');
        console.log('online users: ', onlineUsers);
    })

    socket.on("sendMessage", async (data) => {
        console.log('data from frontend: ', data);
        const save = saveMessage(data)
        socket.emit("save-message", {
            status: "ok",
            message: "message saved",
            content: save,
        })
        console.log('online users: ', onlineUsers);
        const socketID = onlineUsers[data.recID]
        console.log('receiver socket id: ', socketID);
        io.to(socketID).emit("message-confirm", {
            message: "avrit didnt messaged you",
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