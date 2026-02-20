import { useRef, useEffect } from "react";
import { io } from "socket.io-client";

export const useSocket = ({
    ID,
    selectedUserRef,
    setMessages,
    friends,
    setActiveUsers
}) => {

    const socketRef = useRef(null);

    useEffect(() => {
        if (!ID) return;

        socketRef.current = io("http://localhost:3000", {
            auth: {
                token: localStorage.getItem("token")
            }
        });

        socketRef.current.on("connect", () => {
            console.log("socket connected:", socketRef.current.id);
            socketRef.current.emit("addUser");
        });

        const onSaveMessage = (data) => {
            console.log("save-message:", data);
        };
        socketRef.current.on("save-message", onSaveMessage);

        const onReceiveMessage = (Data) => {
            try {
                console.log('data on onReceiveMessage: ', Data);
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

        socketRef.current.on("receive-message", onReceiveMessage);

        socketRef.current.on("userConnected", (data) => {
            console.log('data in userConnected: ', data);
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

        return () => {
            if (!socketRef.current) return;
            socketRef.current.off("save-message", onSaveMessage);
            socketRef.current.off("receive-message", onReceiveMessage);
            socketRef.current.disconnect();
            socketRef.current = null;
        };
    }, [ID]);

    const sendMessage = (msg) => {
        console.log('current selected user: ', selectedUserRef.current);
        socketRef.current.emit("sendMessage", {
            recID: selectedUserRef.current._id,
            Message: msg,
        });
    };

    return { sendMessage };
};