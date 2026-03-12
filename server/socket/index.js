import { saveMessage } from "../controllers/messageController.js";
import Block from "../models/Block.js"
import jwt from 'jsonwebtoken';

let onlineUsers = new Map();

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
        socket.join(socket.userID);
        console.log('user connected: ', socket.userID);

        socket.on("addUser", async () => {
            onlineUsers.set(socket.userID, socket.id);

            const blocked = await Block.find({
                $or: [
                    { blocked_ID: socket.userID },
                    { blocker_ID: socket.userID }
                ]
            });

            const blockedIDs = new Set();

            blocked.forEach(b => {
                blockedIDs.add(b.blocker_ID.toString());
                blockedIDs.add(b.blocked_ID.toString());
            });

            const visibleUsers = Array.from(onlineUsers.keys())
                .filter(id => !blockedIDs.has(id) && id !== socket.userID);

            io.emit("userConnected", {
                onlineUsers: visibleUsers
            });
            console.log('onlineusers: ', onlineUsers.keys());
            console.log('rooms online: ', socket.rooms);
        });

        socket.on("sendMessage", async (data) => {
            const blocked = await Block.findOne({
                $or: [
                    { blocked_ID: data.recID, blocker_ID: socket.userID },
                    { blocker_ID: data.recID, blocked_ID: socket.userID }
                ]
            })
            if (blocked) return;
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

        socket.on("startTyping", async (data) => {
            const blocked = await Block.findOne({
                $or: [
                    { blocked_ID: data.room, blocker_ID: socket.userID },
                    { blocker_ID: data.room, blocked_ID: socket.userID }
                ]
            })
            if (blocked) return;
            console.log('typing: ', data.room);
            io.to(data.room).emit("typing:start");
        });

        socket.on("stopTyping", async (data) => {
            const blocked = await Block.findOne({
                $or: [
                    { blocked_ID: data.room, blocker_ID: socket.userID },
                    { blocker_ID: data.room, blocked_ID: socket.userID }
                ]
            })
            if (blocked) return;
            console.log('typing stopped: ', data.room);
            io.to(data.room).emit("typing:stop");
        });

        socket.on("disconnect", () => {
            if (socket.userID) {
                console.log('user disconnected: ', socket.userID);
                socket.broadcast.emit("userDisconnected", {
                    USER: socket.userID
                });
            }
        });
    });
};