import React from 'react';
import './new-element-button.css'

function NewElementButton() {

  const seeOptions = () =>{
    document.querySelector('.add-options')?.classList.add('active')
    document.querySelector('.add-element')?.classList.add('active')
    console.log('click')
  }

  return (
    <div className='new-element__button'>
      <div className='add-element'>
        <h2>Додај нови елемент</h2>
        <img src="add.png" alt="add" className='add-image' onClick={seeOptions}/>
      </div>
      <div className='add-options'>
        <div className='add-option'>
            <h2>Zaglavlje</h2>
            <img src="header.png" alt="add" className='add-image'/>
        </div>
        <div className='add-option'>
            <h2>Текст</h2>
            <img src="text.png" alt="add" className='add-image'/>
        </div>
        <div className='add-option'>
            <h2>Slika</h2>
            <img src="photo.png" alt="add" className='add-image'/>
        </div>
        <div className='add-option'>
            <h2>Video</h2>
            <img src="video.png" alt="add" className='add-image'/>
        </div>
      </div>
    </div>
  );
}

export default NewElementButton;