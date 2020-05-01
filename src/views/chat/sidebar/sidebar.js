import React, {useContext, useState, useEffect, Fragment} from 'react';
import Section from './components/section';
import UserItem from './components/user-item';
import GroupItem from './components/group-item';

import {Link} from 'react-router-dom';

import JoinIcon from './images/join-icon.svg';
import AddIcon from './images/add-icon.svg';
import LogoutIcon from './images/logout-icon.svg';

import { store, socket } from '../../../store/store.js'

const Sidebar = ({groups, profile, callback}) => {
    const { state, dispatch } = useContext(store);

    const createGroupInfo = (groups) => {
        const yourGroups = [];
        const otherGroups = [];
        // console.log('creae group info', groups)
        // `groups` is map
        Object.values(groups).forEach(g => {
            const memberIds = g.members.map(member => member.userId);
            if (memberIds.includes(state.loginId)) {
                yourGroups.push({...g});
            } else {
                otherGroups.push({...g});
            }
        });
        return (
            <Fragment>
                <Section name="your group" action={<>
                    <Link to='/create-group'>
                        <img src={AddIcon} className="icon" />
                    </Link>
                </>
                }>
                    {
                        yourGroups.map(g => {

                            return <GroupItem group={g} callback={() => handleEnterGroup(g.groupName)}
                                action={<img src={LogoutIcon} className="icon" onClick={() => handleLeaveGroup(g.groupName)} />}
                            />;
                        })
                    }
                </Section>
                    <Section name="groups">
                        {
                            otherGroups.map(g => {
                                return <GroupItem group={g} callback={() => alert("Please join group to view message")}
                                    action={<img src={JoinIcon} className="icon" onClick={() => handleJoinGroup(g.groupName)} />}
                                />
                            })
                        }
                </Section>
            </Fragment>
        );

    }
    
    const handleEnterGroup = (groupName) => {
        console.log('enter group', groupName)
        callback(groupName);
    }

    const handleJoinGroup = (groupName) => {
        socket.emit('client_joinGroup', {
            groupName: groupName,
            username: state.loginUsername
        });
    }

    const handleLeaveGroup = (groupName) => {

        socket.emit('client_leaveGroup', {
            groupName: groupName,
            username: state.loginUsername
        });
    }

    return (
        <div className="chat-sidebar">
            <Section name="your profile">
                <UserItem user={profile}/>
            </Section>
            {createGroupInfo(groups)}

        </div>
    )
}

export default Sidebar;