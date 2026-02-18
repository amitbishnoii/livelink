import { saveMessage } from "../controllers/messageController.js";
import jwt from 'jsonwebtoken';

const onlineUsers = {}

export const initSocket = (io) => {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("token not found!"));
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) return next(new Error("token error!"));
            socket.userID = user.ID;
            next();
        });
    });

    io.on("connection", (socket) => {
        console.log("new connection at: ", socket.id);

        socket.on("addUser", (userId) => {
            onlineUsers[userId] = socket.id;
            socket.userID = userId;
            console.log('adduser trigerred');
            socket.broadcast.emit("userConnected", {
                USER: userId
            });
            console.log('online users: ', onlineUsers);
        });

        socket.on("disconnect", () => {
            const userId = socket.userID;

            if (userId) {
                delete onlineUsers[userId];
                console.log("users online after disconnection: ", onlineUsers);
                socket.broadcast.emit("userDisconnected", {
                    USER: userId
                });
            }
        });

        socket.on("sendMessage", async (data) => {
            console.log('data in server.js: ', data);
            const save = await saveMessage(data);
            socket.emit("save-message", {
                status: "ok",
                message: "message saved",
                content: save.content,
            });
            const socketID = onlineUsers[data.recID];
            const socketIDofSender = onlineUsers[data.senderID];
            console.log('receiver socket id: ', socketID);
            console.log('sender socket id: ', socketIDofSender);
            io.to(socketID).emit("receive-message", {
                id: data.senderID,
                content: data.Message,
            });
            io.to(socketIDofSender).emit("receive-message", {
                id: data.senderID,
                content: data.Message,
            });
        });
    });
};