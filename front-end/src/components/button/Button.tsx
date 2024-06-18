import React from 'react';
import './button.css'

const Button: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className='button-container'>
      <h2>{text}</h2>
    </div>
  );
}

export default Button;