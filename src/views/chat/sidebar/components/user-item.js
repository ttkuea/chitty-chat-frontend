import React from 'react';
import Item from './item';
import LogoutIcon from '../images/logout-icon.svg';

const UserItem = ({user}) => {
    const {name, image} = user;
    return (
        <Item image={image} name={name}>
            <img src={LogoutIcon} className="icon"/>
        </Item>
    )
}

export default UserItem;