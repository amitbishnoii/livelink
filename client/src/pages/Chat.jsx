import React from 'react'
import "../CSS/Chat.css"
import { useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { IoIosAttach } from "react-icons/io";

const Chat = () => {
    const [selectedUser, setselectedUser] = useState(null);
    const [input, setinput] = useState();
    const [message, setmessage] = useState();
    const [file, setfile] = useState();
    const [friend, setfriend] = useState([
        {
            "name": "avrit",
            "username": "avrittoor",
            "profile-pic": "https://imgs.search.brave.com/OeaPDkJ0ITqvZfJOZippVCiinWetnZAvuLEYObrzLPc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI3/MDIxODIxMC9waG90/by9jbG9zZS11cC1j/b21wdXRlci1jb2Rl/LW9uLXNjcmVlbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/QUl2bklmWG9Eangt/ZW11OG9rRWtpMTNa/MVpBZ1B1WnFBOFhU/al9hTC1tST0",
            "bio": "a;ldfjas;ldkfj"
        },
        {
            "name": "rahul",
            "profile-pic": "https://imgs.search.brave.com/uIAYlUlH1byPjJBYX21hhcvUgKxfGqwyYcTPLedl5MU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9y/ZWQtdmVoaWNsZS1j/YXJfNDE3NzY3LTMz/My5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQwJnE9ODA",
        },
    ]);

    const handleSend = () => {
        setmessage(input);
        setinput("");
    }


    return (
        <>
            <div className="chat-main">
                <h2>LiveLink Chat Application</h2>
                <div className="content-main">
                    <div className="left-bar">
                        <h3>Messages</h3>
                        <div className="search-bar">
                            <input type="text" placeholder='Search by Username' />
                            <button>Search</button>
                        </div>
                        <div className="friends-section">
                            {friend.map((info, i) => {
                                return (
                                    <div key={i} className="profile-card" onClick={() => setselectedUser(info)}>
                                        <img src={info['profile-pic']} alt={info.name} className='profile-pic' />
                                        <p>{info.name}</p>
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
                                        <p>{selectedUser.name}</p>
                                        <span>@{selectedUser.username}</span>
                                    </div>
                                </div>
                                <div className="messages">
                                    {message}
                                </div>
                                <div className="chat-window">
                                    <div className="message-bar">
                                        <input type="file" id='file-input' style={{ "display": "none" }} onChange={e => {setfile(e.target.files[0])}} />

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
                                <h5>{selectedUser.name}</h5>
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