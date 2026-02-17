import React, { useRef, useState, useEffect } from 'react';
import "../CSS/Chat.css";
import { getInfo, getFriends, getFriendInfo, getMessages } from '../api/chatApi';
import { BsFillSendFill } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { IoPersonAdd } from "react-icons/io5";
import { io } from "socket.io-client";

const Chat = () => {
    const socket = useRef(null);
    const selectedUserRef = useRef(null);
    const location = useLocation();
    const { user } = location.state;
    const [ID, setID] = useState(null);
    const [friends, setFriends] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentChatInfo, setCurrentChatInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [searchFriend, setSearchFriend] = useState("");
    const [friendCard, setFriendCard] = useState(null);
    const [activeUsers, setActiveUsers] = useState([])

    useEffect(() => {
        selectedUserRef.current = selectedUser;
    }, [selectedUser]);

    
    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        if (!ID) return;
        getFriends();
    }, [ID]);

    useEffect(() => {
        getFriendInfo(selectedUser);
        getMessages(ID, selectedUser?._id);
    }, [selectedUser]);

    useEffect(() => {
        if (!socket.current) return;

        socket.current.on("userConnected", (data) => {
            if (friends.some(friend => friend._id === data.USER)) {
                setActiveUsers(prev => {
                    if (!prev.includes(data.USER)) {
                        return [...prev, data.USER];
                    }
                    return prev;
                })
            }
        })

        socket.current.on("userDisconnected", (data) => {
            console.log('userDisconnected Fired!!');
            setActiveUsers(prev => prev.filter(id => id !== data.USER));
        })
    }, [friends])

    useEffect(() => {
        if (!ID) return;

        socket.current = io("http://localhost:3000");

        socket.current.on("connect", () => {
            console.log("Socket connected:", socket.current.id);
            socket.current.emit("addUser", ID);
        });

        const onSaveMessage = (data) => {
            console.log("save-message:", data);
        };
        socket.current.on("save-message", onSaveMessage);

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

        socket.current.on("receive-message", onReceiveMessage);

        return () => {
            if (!socket.current) return;
            socket.current.off("save-message", onSaveMessage);
            socket.current.off("receive-message", onReceiveMessage);
            socket.current.disconnect();
            socket.current = null;
        };
    }, [ID]);


    const handleSend = () => {
        if (!input || !selectedUser || !ID) return;

        const msg = input;
        setInput("");

        socket.current.emit("sendMessage", {
            senderID: ID,
            recID: selectedUser._id,
            Message: msg,
        });

        setMessages(prev => [...prev, { id: ID, content: msg }]);
    };

    const handleSearch = async () => {
        try {
            if (!searchFriend) return;
            const res = await fetch(`http://localhost:3000/user/searchUser?username=${searchFriend}`);
            const r = await res.json();
            setFriendCard(r.userInfo || null);
        } catch (err) {
            console.error("handleSearch error:", err);
        }
    };

    const handleAddFriend = async () => {
        try {
            if (!friendCard) return;
            const res = await fetch("http://localhost:3000/friends/friend/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sender_id: ID, rec_id: friendCard._id }),
            });
            const r = await res.json();
            if (r.success) {
                getFriends();
                setFriendCard(null);
                setSearchFriend("");
            }
        } catch (err) {
            console.error("handleAddFriend error:", err);
        }
    };

    return (
        <div className="chat-main">
            <h2>LiveLink Chat Application</h2>
            <div className="content-main">
                <div className="left-bar">
                    <h3>Messages</h3>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by Username"
                            value={searchFriend}
                            onChange={e => setSearchFriend(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>

                    {searchFriend && friendCard && (
                        <div className="friend-card">
                            <div className="friend-info">
                                <p>{friendCard.userName}</p>
                                <span>{friendCard.firstName}</span>
                            </div>
                            <button onClick={handleAddFriend}><IoPersonAdd size={20} /></button>
                        </div>
                    )}

                    <div className="friends-section">
                        {friends.map((info, i) => (
                            <div
                                key={i}
                                className="profile-card"
                                onClick={() => setSelectedUser(info)}
                            >
                                <img src={info.profilePic} alt={info.name} className="profile-pic" />
                                <p>{info.firstName}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="center-main">
                    {selectedUser ? (
                        <>
                            <div className="chat-profile">
                                <div className="avatar">
                                    <img src={currentChatInfo?.profilePic} alt="" />
                                    <div className={
                                        activeUsers.some(user => user === selectedUser._id)
                                            ? "active-status"
                                            : ""
                                    }></div>
                                </div>
                                <div className="userinfo">
                                    <p>{selectedUser.firstName}</p>
                                    <span>@{selectedUser.userName}</span>
                                </div>
                            </div>

                            <div className="chat-window">
                                <div className="message-window">
                                    {messages.map((text, idx) => (
                                        <div
                                            key={idx}
                                            className={`message-bubble ${String(text.sender) === String(ID) ? "right-align" : "left-align"
                                                }`}
                                        >
                                            {text.content}
                                        </div>
                                    ))}
                                </div>

                                <div className="message-bar">
                                    <input
                                        type="text"
                                        placeholder="Message..."
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                                    />
                                    <button onClick={handleSend}><BsFillSendFill /></button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div style={{ padding: 20 }}>Select a friend to start chatting</div>
                    )}
                </div>

                <div className="right-bar">
                    {selectedUser && currentChatInfo && (
                        <div className="user-info">
                            <img src={currentChatInfo.profilePic} alt="" />
                            <h5>{selectedUser.firstName}</h5>
                            <span>{selectedUser.bio}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
