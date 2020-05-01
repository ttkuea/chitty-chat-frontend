import React from 'react';
import Item from './item';

const GroupItem = ({group, action}) => {
    const {groupName, image} = group;
    return (
        <Item image={image} name={groupName}>
            { action }
        </Item>
    )
}

export default GroupItem;