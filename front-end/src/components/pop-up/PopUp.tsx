import React from 'react';
import './pop-up.css';

interface PopUpProps {
  onClose: () => void;
  children: React.ReactNode; // Add children prop to the interface
}

const PopUp: React.FC<PopUpProps> = ({ onClose, children }) => {
  return (
    <div className='pop-up__container'>
      <div className='pop-up'>
        {children}
        <img src="cross.png" alt="cross" className='pop-up__cross' onClick={onClose} />
      </div>
    </div>
  );
};

export default PopUp;
