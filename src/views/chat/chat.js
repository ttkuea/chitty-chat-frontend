import React, { useEffect, useContext, useState } from 'react';
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
    const [groups, setGroups] = useState([]);
    const [curGroupName, setCurGroupName] = useState();
    useEffect(() => {
        socket.emit('client_getGroupInfo');
        socket.on('server_emitGroupInfo', (res) => {
            setGroups(res);
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
        console.log("fron end click enter group: ", groupName);
        setCurGroupName(groupName);
    };

    return (
        <div className="chat-page-layout">
            <div className="container">
                <div className="sidebar">
                    <Sidebar groups={groups} profile={getProfile} callback={enterGroup_cb}/>
                </div>
                <div className="main">
                    {curGroupName && <ChatRoom groups={groups} groupName={curGroupName}/>}
                </div>
            </div>
        </div>
    )
}

export default Chat;