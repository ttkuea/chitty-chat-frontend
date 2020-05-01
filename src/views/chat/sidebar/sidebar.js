import React from 'react';
import Section from './components/section';
import UserItem from './components/user-item';
import GroupItem from './components/group-item';

import {Link} from 'react-router-dom';

import JoinIcon from './images/join-icon.svg';
import AddIcon from './images/add-icon.svg';
import LogoutIcon from './images/logout-icon.svg';

const Sidebar = ({groups, profile}) => {
    const yourGroups = groups.filter(g => g.join);
    const otherGroups = groups.filter(g => !g.join);


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
                        action={ <img src={JoinIcon} className="icon"/> }
                        />
                    })
                }
            </Section>

        </div>
    )
}

export default Sidebar;