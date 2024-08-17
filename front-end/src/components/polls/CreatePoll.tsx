import React, { useState } from 'react';
import './polls.css';
import ElementOptions from '../create-news/ElementOptions';
import Button from '../button/Button';
import TextInput from '../form-elements/TextInput';
import { usePoll } from '../../hooks/pollHooks/usePoll';
import MessageBox from '../message-box/MessageBox';
import { MessageBoxTypes } from './helpers';

function CreatePoll() {

  const [title, setTitle] = useState('');
  const [elements, setElements] = useState<number[]>([]);
  const [optionValues, setOptionValues] = useState<{ [key: number]: string }>({});
  const {createPoll, isLoadingCreate, createError, createInfo,} = usePoll(-1);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const addElement = () => {
    setElements([...elements, elements.length + 1]);
  };

  const publishPoll = async () => {
    createPoll({title, elements, optionValues})
    setTitle('');
    setElements([]);
    setOptionValues({});
  };

  const handleOptionChange = (id: number, value: string) => {
    setOptionValues({ ...optionValues, [id]: value });
  };

  const handleDeleteElement = (id: number) => {
    setElements(elements.filter(elementId => elementId !== id));
    const { [id]: _, ...newOptionValues } = optionValues;
    setOptionValues(newOptionValues);
  };

  return (
    <div className='create-news'>
      <h1>Креирај ново гласање</h1>
      <div className='news-part'>
        <div className='name-icon'>
          <h2>Наслов</h2>
          <img src="header.png" alt="header" className='add-image' />  
        </div>
        <TextInput 
          value={title} 
          onChange={handleTitleChange} 
          type="text"
          placeholder='Унесите наслов гласања овде'
        />
      </div>
      <div className='new-elements__container'>
        <div className="component-list">
          {elements.map((id) => (
            <ElementOptions
              key={id}
              id={id}
              headerValue={optionValues[id] || ''}
              onHeaderChange={handleOptionChange}
              onDelete={handleDeleteElement}
              headerTitle='Опција'
              single={true}
            />
          ))}
        </div>
        <div className='new-element__button' onClick={addElement}>
          <div className='add-element'>
            <h2>Додај нову опцију</h2>
            <img src="add.png" alt="add" className='add-image' />
          </div>
        </div>
        <div onClick={publishPoll}>
          <Button text='Објави ново гласање' />
        </div>
      </div>
      {createError && <MessageBox text={createError} infoType={MessageBoxTypes.Error}/>}
      {createInfo && <MessageBox text={createInfo} infoType={MessageBoxTypes.Info}/>}
      {isLoadingCreate && <MessageBox text='Креирање новог гласања...' infoType={MessageBoxTypes.Loading}/>}
    </div>
  );
}

export default CreatePoll;
