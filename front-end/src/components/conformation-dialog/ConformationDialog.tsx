import React from 'react';
import './conformation-dialog.css';
import Button from '../button/Button';

interface ConformationDialogProps {
  onConfirm: () => void;
  onClose: () => void;
}

const ConformationDialog: React.FC<ConformationDialogProps> = ({ onConfirm, onClose }) => {
  return (
    <div className='conformation-dialog__container'>
      <div className='conformation-dialog'>
        <h2>Jeste li sigurni?</h2>
        <div className='conformation-dialog__buttons'>
            <div className='conformation-dialog__button' onClick={onConfirm}>
                <Button text='DA'/>
            </div>
            <div className='conformation-dialog__button' onClick={onClose}>
                <Button text='NE'/>
            </div>
        </div>
        <img src="cross.png" alt="cross" className='material-cross' onClick={onClose}/>
      </div>
    </div>
  );
}

export default ConformationDialog;
