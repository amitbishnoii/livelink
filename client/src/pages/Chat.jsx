import React from 'react'
import "../CSS/Chat.css"
import { useState } from 'react'

const Chat = () => {
    const [selectedUser, setselectedUser] = useState(null);

    const [friend, setfriend] = useState([
        {
            "name": "avrit",
            "profile-pic": "https://imgs.search.brave.com/OeaPDkJ0ITqvZfJOZippVCiinWetnZAvuLEYObrzLPc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI3/MDIxODIxMC9waG90/by9jbG9zZS11cC1j/b21wdXRlci1jb2Rl/LW9uLXNjcmVlbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/QUl2bklmWG9Eangt/ZW11OG9rRWtpMTNa/MVpBZ1B1WnFBOFhU/al9hTC1tST0",
            "bio": "a;ldfjas;ldkfj"
        },
        {
            "name": "rahul",
            "profile-pic": "https://imgs.search.brave.com/OeaPDkJ0ITqvZfJOZippVCiinWetnZAvuLEYObrzLPc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI3/MDIxODIxMC9waG90/by9jbG9zZS11cC1j/b21wdXRlci1jb2Rl/LW9uLXNjcmVlbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/QUl2bklmWG9Eangt/ZW11OG9rRWtpMTNa/MVpBZ1B1WnFBOFhU/al9hTC1tST0",
        },
    ]);


    return (
        <>
            <div className="chat-main">
                <h2>LiveLink Chat Application</h2>
                <div className="content-main">
                    <div className="left-bar">
                        <h3>Messages</h3>
                        <div className="search-bar">
                            <input type="text" placeholder='Search' />
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
                            <div className="chat-profile">
                                <img src={selectedUser["profile-pic"]} alt="" />
                                <p>{selectedUser.name}</p>
                            </div>
                        ) : <span>Search for friends to start chatting...</span>}
                    </div>
                    <div className="right-bar">
                        {selectedUser ? (
                            <div className="user-info">
                                <img src={selectedUser["profile-pic"]} alt="" />
                                <h5>{selectedUser.name}</h5>
                                <p>{selectedUser.bio}</p>
                            </div>
                        ) : ""}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat