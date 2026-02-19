import { saveMessage } from "../controllers/messageController.js";
import jwt from 'jsonwebtoken';

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

        socket.on("addUser", () => {
            socket.join(socket.userID);
            console.log('adduser trigerred');
            socket.broadcast.emit("userConnected", {
                USER: socket.userID
            });
            console.log('online users: ', socket.userID);
        });

        socket.on("disconnect", () => {
            if (socket.userID) {
                socket.broadcast.emit("userDisconnected", {
                    USER: socket.userID
                });
            }
        });

        socket.on("sendMessage", async (data) => {
            console.log('data in server.js: ', data);
            const save = await saveMessage(socket.userID, data);
            socket.emit("save-message", {
                status: "ok",
                message: "message saved",
                content: save.content,
            });
            // const socketID = onlineUsers[data.recID];
            // const socketIDofSender = onlineUsers[socket.userID];
            // console.log('receiver socket id: ', socketID);
            // console.log('sender socket id: ', socketIDofSender);
            io.to(data.recID).emit("receive-message", {
                id: socket.userID,
                content: data.Message,
            });
            io.to(socket.userID).emit("receive-message", {
                id: socket.userID,
                content: data.Message,
            });
        });
    });
};