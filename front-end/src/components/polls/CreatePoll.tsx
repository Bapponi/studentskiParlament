import React, { useState } from 'react';
import './polls.css';
import ElementOptions from '../create-news/ElementOptions';
import Button from '../button/Button';
import TextInput from '../form-elements/TextInput';

function CreatePoll() {

  const [titleValue, setTitleValue] = useState('');
  const [elements, setElements] = useState<number[]>([]);
  const [optionValues, setOptionValues] = useState<{ [key: number]: string }>({});

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const addElement = () => {
    setElements([...elements, elements.length + 1]);
  };

  const publishPoll = async () => {
    const payload = {
      title: titleValue,
      elements,
      optionValues
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/poll/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to upload poll: ${errorMessage}`);
      }

      setTitleValue('');
      setElements([]);
      setOptionValues({});

    } catch (error) {
      console.error('Error uploading poll:', error);
    }
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
          value={titleValue} 
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
            />
          ))}
        </div>
        <div className='new-element__button' onClick={addElement}>
          <div className='add-element'>
            <h2>Додај нови елемент</h2>
            <img src="add.png" alt="add" className='add-image' />
          </div>
        </div>
        <div onClick={publishPoll}>
          <Button text='Објави ново гласање' />
        </div>
      </div>
    </div>
  );
}

export default CreatePoll;
