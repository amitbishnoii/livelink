import React from 'react'
import "../CSS/Chat.css"

const Chat = () => {
    return (
        <>
            <div className="chat-main">
                <h2>LiveLink Chat Application</h2>
                <div className="content-main">
                    <div className="left-bar">
                        <div className="search-bar">
                            <input type="text" placeholder='Search' />
                        </div>
                    </div>
                    <div className="center-main">
                        this is main chat area
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