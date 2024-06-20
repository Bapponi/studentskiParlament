import React from 'react';
import './form-elements.css';

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, type }) => {
  return (
    <div className='form-element__container'>
      <input 
        type={type}
        className='input-field'
        placeholder='Унесите наслов овде' 
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default TextInput;