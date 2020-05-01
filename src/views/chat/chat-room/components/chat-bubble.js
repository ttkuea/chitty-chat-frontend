import React from 'react';
import './chat-bubble.scss';

const ChatBubble = ({
    message: {
        sender,
        message,
        timestamp,
    },
    isOwn, // show on the right
}) => {
    const className = isOwn ? "chat-bubble own" : "chat-bubble";
    return (
        <div className={className}>
            { !isOwn && <img src="https://i.pravatar.cc/48" className="avatar"/> }
            <div className="message">
                { !isOwn && <div className="sender"> {sender} </div> }
                <div className="text"> {message} </div>
            </div>
            <div className="timestamp"> {new Date(timestamp).toISOString()} </div>
        </div>
    )
}

export default ChatBubble;