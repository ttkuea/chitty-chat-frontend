import React, { useState, useEffect, useContext, useRef } from 'react';
import './chat-room.scss';
import { Repeat } from '../chat';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChatBubble from './components/chat-bubble';
import UnreadMarker from './components/unread-marker';

import { store, socket } from '../../../store/store.js';
import request from 'superagent';

const fakeMessage = {
    message: "doge doge",
    username: "road",
    timestamp: "2019-12-31T00:11:22Z"
};

const ChatRoom = ({groups, groupName, onMessage}) => {
    const { state, dispatch } = useContext(store);
    const [messages, setMessages] = useState([]);
    const [unreadPosition, setUnreadPosition] = useState(-1);

    const inputEl = useRef(null);

    useEffect(() => {
    //     
        // get all previos message
        socket.on('server_emitOnEnterGroup', (res) => {
            setUnreadPosition(res.Unread.length ? res.Read.length-1 : -1);
            setMessages([...res.Read, ...res.Unread]);
        });
        return () => {
            socket.off('server_emitChat');
            socket.off('server_emitOnEnterGroup');
            socket.emit('client_leaveGroup', {groupName: groupName, username:state.loginUsername});
        };
    }, []);

    useEffect(() => {
        socket.on('server_emitChat', (res) => {
            setMessages([...messages, res])
        })

        return () => {
            socket.off('server_emitChat');
        }
    }, [messages])

    const handleSendMsg = () => {
        const value = inputEl.current.textContent;
        inputEl.current.textContent = undefined;

        socket.emit('client_sendMsg', {
            groupName: groupName, 
            sender:state.loginUsername,
            message: value
        });
    }

    
    // const createChat = () => {
    //     const group = groups.filter(g => g.groupName == groupName)[0];
    // }
    // update message
    // thisGroup.messages.forEach(m => {
    //     request.get(`http://`) // TODO how to find username
    // })

    const chatRef = useRef();
    // chatRef.current && console.log(chatRef.current);
    useEffect(() => {
        const el = chatRef.current;
        el && el.lastChild && el.lastChild.scrollIntoView();
    });

    return (
        <div className="chat-room">
            <div className="title">
                <div className="group-title"> {groupName}</div> 
            </div>
            <div className="chat" ref={chatRef}>
                {/* {JSON.stringify(groups)} */}
                {messages.map((m, index) => {
                    return <>
                        <ChatBubble message={m}/>
                        {index == unreadPosition && <UnreadMarker/>}
                    </>
                })}
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