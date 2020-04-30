import React from 'react';
import Item from './item';

const UserItem = ({user}) => {
    const {name, image} = user;
    return (
        <Item img="..." name="...">
            log out
        </Item>
    )
}

export default UserItem;