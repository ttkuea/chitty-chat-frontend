import React from 'react';
import Item from './item';

const GroupItem = ({group, action}) => {
    const {name, image} = group;
    return (
        <Item image={image} name={name}>
            { action }
        </Item>
    )
}

export default GroupItem;