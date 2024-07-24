import React, { useEffect, useRef } from 'react';
import './button.css';

const Button: React.FC<{ text: string, active?: boolean }> = ({ text, active }) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      if (active) {
        buttonRef.current.classList.add('active');
      } else {
        buttonRef.current.classList.remove('active');
      }
    }
  }, [active]);

  return (
    <div ref={buttonRef} className='button-container'>
      <h2>{text}</h2>
    </div>
  );
};

export default Button;
