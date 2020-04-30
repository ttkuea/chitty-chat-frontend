import React from 'react';
import './item.scss';

const Item = ({name, image, children}) => {
    return (
        <div className="item">
            <div className="image">
                <img src={image}/>
            </div>
            <div className="name"> {name} </div>
            <div className="action"> {children}</div>
        </div>
    )
}

export default Item;