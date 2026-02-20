import { saveMessage } from "../controllers/messageController.js";
import jwt from 'jsonwebtoken';

export const initSocket = (io) => {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("token not found!"));
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) return next(new Error("token error!"));
            socket.userID = String(user.ID);
            next();
        });
    });

    io.on("connection", (socket) => {
        console.log("new connection at: ", socket.id);

        socket.on("addUser", () => {
            socket.join(socket.userID);
            socket.broadcast.emit("userConnected", {
                USER: socket.userID
            });
            console.log('rooms online: ', socket.rooms);
        });

        socket.on("sendMessage", async (data) => {
            const save = await saveMessage(socket.userID, data);
            socket.emit("save-message", {
                status: "ok",
                message: "message saved",
                content: save.content,
            });
            io.to(String(data.recID)).emit("receive-message", {
                Rid: data.recID,
                id: socket.userID,
                content: data.Message,
            });
        });

        socket.on("disconnect", () => {
            if (socket.userID) {
                socket.broadcast.emit("userDisconnected", {
                    USER: socket.userID
                });
            }
        });
    });
};