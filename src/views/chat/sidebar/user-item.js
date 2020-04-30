import React from 'react';
import Item from './item';
import IconButton from './icon-button';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const UserItem = ({user}) => {
    const {name, image} = user;
    return (
        <Item image={image} name={name}>
            <IconButton text="log out" icon={
               <span>  ... </span>
            }/>
        </Item>
    )
}

export default UserItem;