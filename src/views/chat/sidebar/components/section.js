import React, { useState } from 'react';
import './section.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const Section = ({name, children, action}) => {
    const [isExpanded, setExpanded] = useState(true);
    
    return (
        <div className="chat-section">
            <div className="title">
                <div className="caret" onClick={() => setExpanded(!isExpanded)}>
                    <FontAwesomeIcon icon={ isExpanded ? faCaretDown : faCaretRight}/>
                </div>
                <div className="section-name">
                    { name }
                </div>
                <div className="action">
                    { action }
                </div>
            </div>
            { isExpanded && children }
        </div>
    )
};

export default Section;