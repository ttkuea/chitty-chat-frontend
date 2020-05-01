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
        return () => {
            socket.off('server_emitChat');
            socket.off('server_emitOnEnterGroup');
            socket.emit('client_leaveGroup', {groupName: groupName, username:state.loginUsername});
        };
    }, []);

    useEffect(() => {
        console.log("now listening from group", groupName);
        socket.on('server_emitChat', (res) => {
            // append message to global state
            console.log("new message <-", res)
            onMessage({
                groupName,
                message: res,
            });
        })

        return () => {
            socket.off('server_emitChat');
        }
    }, [groupName, groups])

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
    const thisGroup = groups[groupName];
    console.log("chat room data", groups);
    const members = thisGroup.members;
    // update message
    thisGroup.messages.forEach(m => {
        request.get(`http://`) // TODO how to find username
    })

    return (
        <div className="chat-room">
            <div className="title">
                <div className="group-title"> {groupName}</div> 
            </div>
            <div className="chat">
                {/* {JSON.stringify(groups)} */}
                {thisGroup.messages.map(m => {
                    return <ChatBubble message={m}/>
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