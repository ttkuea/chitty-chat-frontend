import React, { useEffect, useContext } from 'react';
import './chat.scss';
import Sidebar from './sidebar/sidebar';
import ChatRoom from './chat-room/chat-room';
import socketIOClient from 'socket.io-client'
import { store } from '../../store/store.js'

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

const fakeProfile = {
    name: "Rodchananat",
    image: "https://i.pravatar.cc/120?u=rod41732",
}

const Chat = () => {
    const { state, dispatch } = useContext(store);

    let socket;

    useEffect(() => {
        socket = socketIOClient(state.endpoint)
        return function cleanup() {
            
        };   
    });

    return (
        <div className="chat-page-layout">
            <div className="container">
                <div className="header">
                    <div className="chat-title"> Chitty Chat </div>
                </div>
                <div className="sidebar">
                    <Sidebar groups={fakeGroups} profile={fakeProfile}/>
                </div>
                <div className="main">
                    <ChatRoom groupName={"foo"}/>
                </div>
            </div>
        </div>
    )
}

export default Chat;