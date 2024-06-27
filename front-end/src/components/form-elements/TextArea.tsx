import React from 'react';
import './form-elements.css';

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className='form-element__container'>
      <textarea 
        className='text-input__area'
        placeholder={placeholder}
        rows={5}
        cols={40}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextArea;