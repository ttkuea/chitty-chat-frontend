import React from 'react';
import './icon-button.scss';

const IconButton = ({text, icon}) => {
    return (
        <div className="icon-button">
            <div className="icon">
                {icon}
            </div>
            <div className="text"> {text} </div>
        </div>
    )
}

export default IconButton;