import React from 'react';
import './form-elements.css';

function TextInput() {
  return (
    <div>
      <input 
        type="text"
        className='input-field'
        placeholder='Unesite naslov ovde' 
      />
    </div>
  );
}

export default TextInput;