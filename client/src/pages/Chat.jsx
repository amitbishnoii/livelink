import React from 'react'
import "../CSS/Chat.css"
import { useState } from 'react'

const Chat = () => {

    const [friend, setfriend] = useState([
        {"name": "avrit",},
        {"name": "avrit",},
        {"name": "avrit",},
        {"name": "avrit",},
        {"name": "avrit",},
    ])


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
                            {friend.map((info) => {
                                return (
                                    <div className="profile-card">
                                        <p>{info.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="center-main">
                        <span>Search for friends to start chatting...</span>
                    </div>
                    <div className="right-bar">
                        this is right area
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat