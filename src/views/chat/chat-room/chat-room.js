import React, { useState, useEffect, useContext, useRef } from 'react';
import './chat-room.scss';
import { Repeat } from '../chat';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChatBubble from './components/chat-bubble';
import UnreadMarker from './components/unread-marker';

import { store, socket } from '../../../store/store.js';

const fakeMessage = {
    message: "doge doge",
    username: "road",
    timestamp: "2019-12-31T00:11:22Z"
};

const ChatRoom = ({groups, groupName}) => {
    const { state, dispatch } = useContext(store);
    const [unread, setUnread] = useState([]);
    const [read, setRead] = useState([]);
    const inputEl = useRef(null);

    useEffect(() => {
        socket.emit('client_enterGroup', {groupName: groupName});
        // socket.on('server_emitChat', (res) => {
        // });
        return () => {
            // socket.off('server_emitChat');
            socket.emit('client_leaveGroup', {groupName: groupName});
        };
    }, []);

    const handleSendMsg = () => {
        const value = inputEl.current.textContent;
        inputEl.current.textContent = undefined;

        socket.emit('client_sendMsg', {
            groupName: groupName, 
            sender:state.loginUsername,
            message: value});
    }

    const createChat = () => {
        const group = groups.filter(g => g.groupName == groupName)[0];
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
                <div className="input" placeholder="Enter a message." ref={inputEl} contentEditable></div>
                <div className="send">
                    <button onClick={handleSendMsg}>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;