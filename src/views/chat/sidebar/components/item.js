import React from 'react';
import './item.scss';

const Item = ({name, image, children, callback}) => {
    return (
        <div className="item">
            <div className="image">
                <img src={image}/>
            </div>
            <div className="name" onClick={callback}> {name} </div>
            <div className="action"> {children}</div>
        </div>
    )
}

export default Item;