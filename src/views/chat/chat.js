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
    
    useEffect(() => {
        socket.emit('client_getGroupInfo');
        socket.on('server_emitGroupInfo', (res) => {
            dispatch({ type:'set',
            
                newState: { groups: res }
            })
            console.log('state', state.groups);
        });
        return () => {
            socket.off('server_emitGroupInfo');
            socket.emit('client_exitGroupInfo');
        };
    }, []);

    const getProfile = {
        name: state.loginUsername,
        image: "https://i.pravatar.cc/120?u=rod41732",
    }

    return (
        <div className="chat-page-layout">
            <div className="container">
                <div className="sidebar">
                    <Sidebar profile={getProfile}/>
                </div>
                <div className="main">
                    <ChatRoom groupName={"foo"}/>
                </div>
            </div>
        </div>
    )
}

export default Chat;