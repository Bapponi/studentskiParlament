import React, { useState } from 'react';
import './message-box.css';

enum MessageBoxTypes{
    Info = 1,
    Error,
    Loading
}

interface MessageBoxProps {
  text?: string;
  infoType: MessageBoxTypes;
}

const MessageBox: React.FC<MessageBoxProps> = ({text, infoType}) => {

return (
    <div className='message-box__container'>
      {infoType == MessageBoxTypes.Info && (
        <h2>{text}</h2>
      )}
      {infoType == MessageBoxTypes.Error && (
        <h2 style={{color: "var(--primary-color)"}}>{text}</h2>
      )}
      {infoType == MessageBoxTypes.Loading && (
        <h2>{text}</h2>
      )}
    </div>
  );
}

export default MessageBox;
