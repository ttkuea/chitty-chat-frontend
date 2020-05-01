import React, {useContext, useState, useEffect} from 'react';
import Section from './components/section';
import UserItem from './components/user-item';
import GroupItem from './components/group-item';

import {Link} from 'react-router-dom';

import JoinIcon from './images/join-icon.svg';
import AddIcon from './images/add-icon.svg';
import LogoutIcon from './images/logout-icon.svg';

import { store, socket } from '../../../store/store.js'

const Sidebar = ({profile}) => {
    const { state, dispatch } = useContext(store);
    const [yourGroups, setYourGroups] = useState([]);
    const [otherGroups, setOtherGroups] = useState([]);
    const [fetch, setFetch] = useState(false);

    useEffect(() => {
        socket.emit('client_getGroupInfo');
        socket.on('server_emitGroupInfo', (res) => {
            updateGroupInfo(res);
        });
        return () => {
            socket.off('server_emitGroupInfo');
            socket.emit('client_exitGroupInfo');
        };
    }, []);

    const updateGroupInfo = (groups) => {
        const newYourGroups = [];
        const newOtherGroups = [];

        groups.forEach(g => {
            const memberIds = g.members.map(member => member.userId);
            if (memberIds.includes(state.loginId)) {
                newYourGroups.push({...g});
            } else {
                newOtherGroups.push({...g});
            }
        });
        setYourGroups(newYourGroups);
        setOtherGroups(newOtherGroups);
    }

    const handleJoinGroup = (groupName) => {
        socket.emit('client_joinGroup', { groupName: groupName, 
            username: state.loginUsername});
    }

    return (
        <div className="chat-sidebar">
            <Section name="your profile">
                <UserItem user={profile}/>
            </Section>
            <Section name="your group" action={ <>
                <Link to='/create-group'>
                    <img src={AddIcon} className="icon"/>
                </Link>
            </>
            }>
                { 
                    yourGroups.map(g => {
                        
                        return <GroupItem group={g}
                            action={ <img src={LogoutIcon} className="icon"/> }
                        />;
                    })
                }
            </Section>
            <Section name="groups">
                { 
                    otherGroups.map(g => {
                        return <GroupItem group={g}
                        action={ <img src={JoinIcon} className="icon" onClick={() => handleJoinGroup(g.groupName)} /> }
                        />
                    })
                }
            </Section>

        </div>
    )
}

export default Sidebar;