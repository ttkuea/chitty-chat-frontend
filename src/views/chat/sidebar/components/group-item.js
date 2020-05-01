import React from 'react';
import Item from './item';

const GroupItem = ({group, action, callback}) => {
    const {groupName, image} = group;
    return (
        <Item image={image} name={groupName} callback={callback}>
            { action }
        </Item>
    )
}

export default GroupItem;