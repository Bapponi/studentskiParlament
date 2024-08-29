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
        <h2>Да ли сте сигурни?</h2>
        <div className='conformation-dialog__buttons'>
            <div className='conformation-dialog__button' onClick={()=>{onClose(); onConfirm();}}>
                <Button text='ДА'/>
            </div>
            <div className='conformation-dialog__button' onClick={onClose}>
                <Button text='НЕ'/>
            </div>
        </div>
        <img src="cross.png" alt="cross" className='material-cross' onClick={onClose}/>
      </div>
    </div>
  );
}

export default ConformationDialog;
