import React from 'react';
import Section from './section';
import UserItem from './user-item';
import GroupItem from './group-item';

import JoinIcon from './images/join-icon.svg';
import AddIcon from './images/add-icon.svg';

const Sidebar = ({groups, profile}) => {
    const yourGroups = groups.filter(g => g.join);
    const otherGroups = groups.filter(g => !g.join);

    return (
        <div className="chat-sidebar">
            <Section name="your profile">
                <UserItem user={profile}/>
            </Section>
            <Section name="your group" action={
                <img src={AddIcon} className="icon"/>
            }>
                { 
                    yourGroups.map(g => {
                        return <GroupItem group={g}/>;
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