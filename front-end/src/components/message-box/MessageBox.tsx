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
    <div>
      {infoType == MessageBoxTypes.Info && (
        <div className='message-box__container'>
          <img src="../checked.png" alt="checked" className='message-box__icon'/>
          <h2>{text}</h2>
        </div>
      )}
      {infoType == MessageBoxTypes.Error && (
        <div className='message-box__container'>
          <img src="../warning.png" alt="warning" className='message-box__icon'/>
          <h2 style={{color: "var(--primary-color)"}}>{text}</h2>
        </div>
      )}
      {infoType == MessageBoxTypes.Loading && (
        <div className='message-box__container'>
          <img src="../loading.gif" alt="loading" className='message-box__icon'/>
          <h2>{text}</h2>
        </div>
      )}
    </div>
  );
}

export default MessageBox;
