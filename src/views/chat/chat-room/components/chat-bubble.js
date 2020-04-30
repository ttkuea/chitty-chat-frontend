import React from 'react';
import './chat-bubble.scss';

const ChatBubble = ({
    message: {
        username,
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
                { !isOwn && <div className="sender"> name </div> }
                <div className="text"> message </div>
            </div>
            <div className="timestamp"> time </div>
        </div>
    )
}

export default ChatBubble;