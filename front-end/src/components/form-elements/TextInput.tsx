import React from 'react';
import './form-elements.css';

function TextInput() {
  return (
    <div className='form-element__container'>
      <input 
        type="text"
        className='input-field'
        placeholder='Унесите наслов овде' 
      />
    </div>
  );
}

export default TextInput;