import React from 'react';
import './form-elements.css';

function TextArea() {
  return (
    <div className='form-element__container'>
      <textarea 
        className='text-input__area'
        placeholder='Унесите текст параграфа овде'
        rows={5}
        cols={40} 
      />
    </div>
  );
}

export default TextArea;