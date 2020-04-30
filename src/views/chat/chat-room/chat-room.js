import React from 'react';
import './chat-room.scss';
import { Repeat } from '../chat';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ChatRoom = ({groupName}) => {
    return (
        <div className="chat-room">
            <div className="title">
                <div className="group-title"> {groupName}</div> 
            </div>
            <div className="chat">
                <Repeat count={2}>
                    <div className="test" placeholder="foo"></div>
                </Repeat>
            </div>
            <div className="chat-box">
                <div className="input" placeholder="Enter a message." contentEditable></div>
                <div className="send">
                    <button>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;