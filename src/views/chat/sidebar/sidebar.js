import React from 'react';
import Section from './section';
import UserItem from './user-item';
import GroupItem from './group-item';

const Sidebar = ({groups, profile}) => {
    const yourGroups = groups.filter(g => g.join);
    const otherGroups = groups.filter(g => !g.join);

    return (
        <div className="chat-sidebar">
            <Section name="your profile">
                <UserItem user={profile}/>
            </Section>
            <Section name="your group" action="...">
                { 
                    yourGroups.map(g => {
                        return <GroupItem group={g} action={"join group"}/>;
                    })
                }
            </Section>
            <Section name="groups">
                { 
                    otherGroups.map(g => {
                        return <GroupItem group={g}
                        action="laeve group"
                        />
                    })
                }
            </Section>

        </div>
    )
}

export default Sidebar;