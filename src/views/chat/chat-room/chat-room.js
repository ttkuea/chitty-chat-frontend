import React, { useState, useEffect } from 'react';
import './chat-room.scss';
import { Repeat } from '../chat';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChatBubble from './components/chat-bubble';
import UnreadMarker from './components/unread-marker';

import { store, socket } from '../store/store.js';

const fakeMessage = {
    message: "doge doge",
    username: "road",
    timestamp: "2019-12-31T00:11:22Z"
};

const ChatRoom = ({groupName}) => {
    const [unread, setUnread] = useState([]);
    const [read, setRead] = useState([]);

    const handleSendMsg = (msg) => {
        socket.emit('client_sendMsg', {message: msg});
    }

    return (
        <div className="chat-room">
            <div className="title">
                <div className="group-title"> {groupName}</div> 
            </div>
            <div className="chat">
                <Repeat count={2}>
                    <ChatBubble message={fakeMessage} isOwn={false}/>
                    <ChatBubble message={fakeMessage} isOwn={false}/>
                    <ChatBubble message={fakeMessage} isOwn={false}/>
                    <ChatBubble message={fakeMessage} isOwn={true}/>
                </Repeat>
                <UnreadMarker/>
                <ChatBubble message={fakeMessage} isOwn={false}/>
                <ChatBubble message={fakeMessage} isOwn={true}/>
            </div>
            <div className="chat-box">
                <div className="input" placeholder="Enter a message." contentEditable></div>
                <div className="send">
                    <button>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;