import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cors from "cors";
import { initSocket } from "./socket/index.js";
import authRoute from "./routes/authRoute.js";
import friendRoute from "./routes/friendRoute.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { Server } from "socket.io";
import http from "http";
import "./config/cloudinary.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

const app = express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
});

initSocket(io);
connectDB();

app.use(express.json());
app.use(cors());
app.use("/auth", authRoute);
app.use("/user", authenticateToken, userRoute);
app.use("/friends", authenticateToken, friendRoute);
app.use("/message", authenticateToken, messageRoute);

app.get("/", async (req, res) => {
    res.send("hello world");
});

server.listen(port, () => {
    console.log("server listening on port ", port);
});