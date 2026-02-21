import React, { useRef, useState, useEffect } from 'react';
import "../CSS/Chat.css";
import { getInfo, getFriends, getFriendInfo, getMessages } from '../api/chatApi';
import { BsFillSendFill } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { IoPersonAdd } from "react-icons/io5";
import { useSocket } from "../hooks/useSocket.js";
import { apiFetch } from '../utils/apiFetch.js'; // this is a custom wrapper function which wraps the token header in the fetch api

const Chat = () => {
    document.title = "Chat | LiveLink"
    const selectedUserRef = useRef(null);
    const typingTimeout = useRef(null);
    const location = useLocation();

    const { user } = location.state;
    const [ID, setID] = useState(null); // this is the _id of the current user
    const [friends, setFriends] = useState([]); // these are the friends of the user
    const [selectedUser, setSelectedUser] = useState(null); // this is the current chat clicked by user
    const [currentChatInfo, setCurrentChatInfo] = useState(null); // info of user which is clicked by client
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState(""); // message typed by the client
    const [searchFriend, setSearchFriend] = useState(""); // username searched in the search bar
    const [friendCard, setFriendCard] = useState(null);
    const [activeUsers, setActiveUsers] = useState([]);

    const { sendMessage, handleInput } = useSocket({
        ID,
        selectedUserRef,
        friends,
        typingTimeout,
        setMessages,
        setInput,
        setActiveUsers
    });

    useEffect(() => {
        selectedUserRef.current = selectedUser;
    }, [selectedUser]);

    useEffect(() => {
        const load = async () => {
            const data = await getInfo(user);
            setID(data.ID || null);
        };
        load();
    }, []);

    useEffect(() => {
        if (!ID) return;
        const loadFriends = async () => {
            const data = await getFriends(ID);
            setFriends(data || []);
        };
        loadFriends();
    }, [ID]);

    useEffect(() => {
        const load = async () => {
            if (!selectedUser || !ID) return;
            const friendInfo = await getFriendInfo(selectedUser);
            const message = await getMessages(ID, selectedUser?._id);
            setCurrentChatInfo(friendInfo || null);
            setMessages(message);
        };
        load();
    }, [selectedUser]);

    const handleSend = () => {
        if (!input || !selectedUser || !ID) return;

        const msg = input;
        setInput("");
        sendMessage(msg);
        setMessages(prev => [...prev, { sender: ID, content: msg }]);
    };

    const handleSearch = async () => {
        try {
            if (!searchFriend) return;
            const res = await apiFetch(`http://localhost:3000/user/searchUser?username=${searchFriend}`);
            const r = await res.json();
            setFriendCard(r.userInfo || null);
        } catch (err) {
            console.error("handleSearch error:", err);
        }
    };

    const handleAddFriend = async () => {
        try {
            if (!friendCard) return;
            const res = await apiFetch("http://localhost:3000/friends/friend/add", {
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
            <h2>LiveLink Chat App</h2>
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
                                    {messages && messages.map((text, idx) => (
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
                                        onChange={(e) => { handleInput(e) }}
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
