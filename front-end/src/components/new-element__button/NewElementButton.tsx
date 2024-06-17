import React from 'react';
import './new-element-button.css'
import TextInput from '../form-elements/TextInput';

function NewElementButton() {

  const seeOptions = () =>{
    document.querySelector('.add-options')?.classList.add('active')
    document.querySelector('.add-element')?.classList.add('active')
    console.log('click')
  }

  const setOption = (value: string) => {
    console.log(value)
    document.querySelector(value)?.classList.add('active')
  }

  return (
    <div className='new-element__button'>
      <div className='add-element' onClick={seeOptions}>
        <h2>Додај нови елемент</h2>
        <img src="add.png" alt="add" className='add-image'/>
      </div>
      <div className='add-options'>
        <div className='add-option' id='header' onClick={() => setOption('.header-input')}>
          <h2>Заглавље</h2>
          <img src="header.png" alt="header" className='add-image'/>
        </div>
        <div className='add-option' id='text' onClick={() => setOption('.text-input')}>
          <h2>Текст</h2>
          <img src="text.png" alt="text" className='add-image'/>
        </div>
        <div className='add-option' id='photo' onClick={() => setOption('.picture-input')}>
          <h2>Слика</h2>
          <img src="photo.png" alt="galery" className='add-image'/>
        </div>
        <div className='add-option' id='video' onClick={() => setOption('.video-input')}>
          <h2>Видео</h2>
          <img src="video.png" alt="video" className='add-image'/>
        </div>
      </div>
      <div className='header-input'>
        <div className='option-header'>
          <div className='option-name'>
            <h2>Заглавље</h2>
            <img src="header.png" alt="header" className='add-image'/>
          </div>
          <img src="cross.png" alt="cross" className='add-image'/>
        </div>
        <div className='input-area'>
          <TextInput/>
        </div>
      </div>
      <div className='text-input'>
        <div className='option-header'>
          <div className='option-name'>
            <h2>Текст</h2>
            <img src="text.png" alt="text" className='add-image'/>
          </div>
          <img src="cross.png" alt="cross" className='add-image'/>
        </div>
        <div className='input-area'>
          <TextInput/>
        </div>
      </div>
      <div className='picture-input'>
        <div className='option-header'>
          <div className='option-name'>
            <h2>Слика</h2>
            <img src="photo.png" alt="galery" className='add-image'/>
          </div>
          <img src="cross.png" alt="cross" className='add-image'/>
        </div>
        <div className='input-area'>
          <TextInput/>
        </div>
      </div>
      <div className='video-input'>
        <div className='option-header'>
          <div className='option-name'>
            <h2>Видео</h2>
            <img src="video.png" alt="video" className='add-image'/>
          </div>
          <img src="cross.png" alt="cross" className='add-image'/>
        </div>
        <div className='input-area'>
          <TextInput/>
        </div>
      </div>
    </div>
  );
}

export default NewElementButton;