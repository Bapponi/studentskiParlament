import React from 'react';
import './form-elements.css';

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string | undefined;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, type, placeholder }) => {
  return (
    <div className='form-element__container'>
      <input 
        type={type}
        className='input-field'
        placeholder={placeholder} 
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default TextInput;