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

const ChatRoom = ({ groupName}) => {
    const { state, dispatch } = useContext(store);
    const [unread, setUnread] = useState([]);
    const [read, setRead] = useState([]);
    const [curGroup, setCurGroup] = useState(null);

    const inputEl = useRef(null);

    useEffect(() => {
    //     
        // get all previos message
        socket.on('server_emitOnEnterGroup', (res) => {
            setCurGroup(res);
            console.log('group messages with username', res);
        });

        socket.on('server_emitChat', (res) => {
            console.log(res);
        });
        return () => {
            socket.off('server_emitChat');
            socket.off('server_emitOnEnterGroup');
            socket.emit('client_leaveGroup', {groupName: groupName, username:state.loginUsername});
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