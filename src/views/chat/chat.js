import React from 'react';
import './chat.scss';
import Sidebar from './sidebar/sidebar';

const Repeat = ({children, count}) => {
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
                    <Repeat count={100}>
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit reprehenderit eos inventore enim modi ab harum incidunt fugit soluta. Sunt ex eaque aliquam ratione quas quam dolor. Vero, voluptas.
                        </div>
                    </Repeat>
                </div>
            </div>
        </div>
    )
}

export default Chat;