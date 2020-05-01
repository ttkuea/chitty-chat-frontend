import React, { useEffect, useContext, useState, useRef } from 'react';
import './chat.scss';
import Sidebar from './sidebar/sidebar';
import ChatRoom from './chat-room/chat-room';
import { store, socket } from '../../store/store.js'

export const Repeat = ({children, count}) => {
    return <>
        {
            Array(count).fill(0).map(() => children)
        }
    </>
}

const fakeGroups = [
    {name: "Doge", image: "https://i.pravatar.cc/120?u=doge", join: 1},
    {name: "Road", image: "https://i.pravatar.cc/120?u=road", join: 0},
    {name: "Doge", image: "https://i.pravatar.cc/120?u=doge", join: 1},
    {name: "Road", image: "https://i.pravatar.cc/120?u=road", join: 1},
    {name: "Doge", image: "https://i.pravatar.cc/120?u=doge", join: 0},
    {name: "Road", image: "https://i.pravatar.cc/120?u=road", join: 1},
];



const Chat = () => {
    const { state, dispatch } = useContext(store);
    const [groups, setGroups] = useState({});
    const [curGroupName, setCurGroupName] = useState();
    useEffect(() => {
        socket.emit('client_getGroupInfo');
        socket.on('server_emitGroupInfo', (res) => {
            // convert to map
            const newGroup = {};
            res.forEach(group => {
                newGroup[group.groupName] = group;
            })
            setGroups(newGroup);
        });
        return () => {
            socket.off('server_emitGroupInfo');
            socket.emit('client_exitGroupInfo');
        };
    }, []);

    const getProfile = {
        name: state.loginUsername,
        image: "https://i.pravatar.cc/120?u=rod41732",
    };

    const enterGroup_cb = (groupName) => {
        setCurGroupName(groupName);

        // exit old group
        curGroupName && socket.emit('client_leaveGroup', { groupName: curGroupName, username: state.loginUsername });
        socket.emit('client_enterGroup', { groupName: groupName, username: state.loginUsername });
        
    };
    
    function onMessage(event) {
        const {groupName, message} = event;
        const thisState = groups;
        const newState = {
            ...thisState,
        };
        newState[groupName] = {
            ...thisState[groupName],
            messages: [
                ...thisState[groupName].messages,
                message,
            ]
        };
        setGroups(newState);
    }

    return (
        <div className="chat-page-layout">
            <div className="container">
                <div className="sidebar">
                    <Sidebar groups={groups} profile={getProfile} callback={enterGroup_cb}/>
                </div>
                <div className="main">
                    {curGroupName && <ChatRoom groups={groups} groupName={curGroupName} onMessage={onMessage}/>}
                </div>
            </div>
        </div>
    )
}

export default Chat;