import { useRef, useEffect } from "react";
import { io } from "socket.io-client";

export const useSocket = ({
    ID,
    selectedUserRef,
    setMessages,
    friends,
    setActiveUsers,
    selectedUser
}) => {

    const socketRef = useRef(null);

    useEffect(() => {
        if (!ID) return;

        socketRef.current = io("http://localhost:3000");

        socketRef.current.on("connect", () => {
            console.log("socket connected:", socketRef.current.id);
            socketRef.current.emit("addUser", ID);
        });

        const onSaveMessage = (data) => {
            console.log("save-message:", data);
        };
        socketRef.current.on("save-message", onSaveMessage);

        const onReceiveMessage = (Data) => {
            try {
                const senderId = String(Data?.id);
                const myId = String(ID);

                if (senderId === myId) {
                    return;
                }

                const active = selectedUserRef.current;
                if (active && String(active._id) === senderId) {
                    setMessages(prev => [...prev, { id: senderId, content: Data?.content }]);
                } else {
                    console.log("New message from other user:", senderId, Data?.content);
                }
            } catch (err) {
                console.error("onReceiveMessage error:", err);
            }
        };

        socketRef.current.on("userConnected", (data) => {
            if (friends.some(friend => friend._id === data.USER)) {
                setActiveUsers(prev => {
                    if (!prev.includes(data.USER)) {
                        return [...prev, data.USER];
                    }
                    return prev;
                });
            }
        });

        socketRef.current.on("userDisconnected", (data) => {
            console.log('userDisconnected Fired!!');
            setActiveUsers(prev => prev.filter(id => id !== data.USER));
        });

        socketRef.current.on("receive-message", onReceiveMessage);

        return () => {
            if (!socketRef.current) return;
            socketRef.current.off("save-message", onSaveMessage);
            socketRef.current.off("receive-message", onReceiveMessage);
            socketRef.current.disconnect();
            socketRef.current = null;
        };
    }, [ID]);

    const sendMessage = (msg) => {
        socketRef.current.emit("sendMessage", {
            senderID: ID,
            recID: selectedUser._id,
            Message: msg,
        });
    };

    return { sendMessage };
};