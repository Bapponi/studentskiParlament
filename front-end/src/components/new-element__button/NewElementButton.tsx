import React, { useState } from 'react';
import './new-element-button.css'
import ElementOptions from './ElementOptions';

function NewElementButton() {

  const [elements, setElemenets] = useState<number[]>([]);

  const addElement = () => {
    setElemenets([...elements, elements.length + 1]);
  };

  return (
    <div className='new-elements__container'>
      <div className="component-list">
        {elements.map((id) => (
          <ElementOptions key={id} id={id} />
        ))}
      </div>
      <div className='new-element__button' onClick={addElement}>
        <div className='add-element'>
          <h2>Додај нови елемент</h2>
          <img src="add.png" alt="add" className='add-image'/>
        </div>    
      </div>
    </div>
  );
}

export default NewElementButton;