import React from 'react'
import "../CSS/Chat.css"
import { useState, useEffect } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { IoIosAttach } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { IoPersonAdd } from "react-icons/io5";

const Chat = () => {
    const location = useLocation();
    const { user } = location.state;
    const [selectedUser, setselectedUser] = useState(null);
    const [input, setinput] = useState(null);
    const [message, setmessage] = useState();
    const [file, setfile] = useState();
    const [friendCard, setfriendCard] = useState(null);
    const [searchFriend, setsearchFriend] = useState(null);
    const [friend, setfriend] = useState([]);
    const [ID, setID] = useState(null);

    const handleSend = () => {
        if (input) {
            setmessage(input);
            setinput("");
        }
    }

    const getInfo = async () => {
        console.log("username in chat: ", user);
        const res = await fetch(`http://localhost:3000/user/getID/${user}`);
        const r = await res.json();
        setID(r.ID)
    }

    const getFriends = async () => {
        const res = await fetch(`http://localhost:3000/friends/getFriends/${ID}`);
        const r = await res.json();
        setfriend(r.list);
        console.log(r);
    }

    useEffect(() => {
        getInfo();
    }, [])

    useEffect(() => {
        if (ID) {
            getFriends();
        }
    }, [ID])


    const handleSearch = async () => {
        console.log(searchFriend);
        const res = await fetch(`http://localhost:3000/user/searchUser?username=${searchFriend}`);
        const r = await res.json();
        setfriendCard(r.userInfo)
    }

    const handleAddFriend = async () => {
        const res = await fetch("http://localhost:3000/friends/friend/add", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender_id: ID, rec_id: friendCard?._id })
        })
        const r = await res.json();
        if (r.success) {
            window.location.reload()
        }
    }

    return (
        <>
            <div className="chat-main">
                <h2>LiveLink Chat Application</h2>
                <div className="content-main">
                    <div className="left-bar">
                        <h3>Messages</h3>
                        <div className="search-bar">
                            <input type="text" placeholder='Search by Username' value={searchFriend} onChange={e => setsearchFriend(e.target.value)} />
                            <button onClick={handleSearch}>Search</button>
                        </div>
                        {searchFriend ? (
                            <div className="friend-card">
                                <div className="friend-pic">
                                </div>
                                <div className="friend-info">
                                    <p>{friendCard?.userName}</p>
                                    <span>{friendCard?.firstName}</span>
                                </div>
                                <button onClick={handleAddFriend}><IoPersonAdd size={20} /></button>
                            </div>
                        ) : ("")}
                        <div className="friends-section">
                            {friend.map((info, i) => {
                                return (
                                    <div key={i} className="profile-card" onClick={() => setselectedUser(info)}>
                                        <img src={info['profile-pic']} alt={info.name} className='profile-pic' />
                                        <p>{info.firstName}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="center-main">
                        {selectedUser ? (
                            <>
                                <div className="chat-profile">
                                    <img src={selectedUser["profile-pic"]} alt="" />
                                    <div className="userinfo">
                                        <p>{selectedUser.firstName}</p>
                                        <span>@{selectedUser.userName}</span>
                                    </div>
                                </div>
                                <div className="messages">
                                    {message}
                                </div>
                                <div className="chat-window">
                                    <div className="file-name">
                                        {file ? <span>Attached File: {file?.name}</span> : ""}
                                    </div>
                                    <div className="message-bar">
                                        <input type="file" id='file-input' style={{ "display": "none" }} onChange={e => { setfile(e.target.files[0]) }} />

                                        <button onClick={() => { document.getElementById("file-input").click() }} ><IoIosAttach size={20} /></button>

                                        <input type="text" placeholder='Message...' value={input} onChange={e => setinput(e.target.value)} />

                                        <button onClick={handleSend}><BsFillSendFill /></button>
                                    </div>
                                </div>
                            </>
                        ) : ""}
                    </div>
                    <div className="right-bar">
                        {selectedUser ? (
                            <div className="user-info">
                                <img src={selectedUser["profile-pic"]} alt="" />
                                <h5>{selectedUser.firstName}</h5>
                                <span>{selectedUser.bio}</span>
                            </div>
                        ) : ""}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat