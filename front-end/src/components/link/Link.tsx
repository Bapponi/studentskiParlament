import React, { useState } from 'react';
import './link.css';
import TextInput from '../form-elements/TextInput';
import PhotoUpload from '../form-elements/PhotoUpload';
import Button from '../button/Button';

interface LinkProps {
  id: number;
  logo: string;
  website: string;
  name: string;
  onDelete: (id: number) => void;
}

const LinkSite: React.FC<LinkProps> = ({ id, logo, website, name, onDelete }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newWebsite, setNewWebsite] = useState(website);
  const [newName, setNewName] = useState(name);
  const [currentWebsite, setCurrentWebsite] = useState(website);
  const [currentName, setCurrentName] = useState(name);

  const deleteLink = async () => {
    try {
      const response = await fetch(`http://localhost:8000/link/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Неуспешно избрисан линк!');
      }

      onDelete(id);
    } catch (error) {
      console.error('Грешка приликом брисанја линка:', error);
    }
  };

  const updatePopUp = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const updateLink = async () => {
    try {
      const response = await fetch(`http://localhost:8000/link/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          website: newWebsite,
          name: newName,
        }),
      });

      if (!response.ok) {
        throw new Error('Неуспешно ажуриран линк!');
      } else {
        setCurrentWebsite(newWebsite);
        setCurrentName(newName);
      }

      setIsPopupVisible(false);
    } catch (error) {
      console.error('Грешка приликом ажурирања линка:', error);
    }
  };

  const handleNewFileChange = (file: File | null) => {
    setNewFile(file);
  };

  const handleNewWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWebsite(e.target.value);
  };

  const handleNewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  return (
    <div className='link-container'>
      <a href={currentWebsite} target='_blank' className='link'>
        <img src={logo} alt="link-logo" className='link-logo' />
        <h2>{currentName}</h2>
      </a>
      <img src="bin.png" alt="bin" className='link-admin link-delete' onClick={deleteLink} />
      <img src="refresh.png" alt="upload" className='link-admin link-update' onClick={updatePopUp} />

      {isPopupVisible && (
        <div className='popup'>
          <div className='popup-content'>
            <h2>Промени Линк</h2>
            <PhotoUpload 
              file={newFile} 
              onFileChange={handleNewFileChange} 
              placeholder='Превуци нови лого овде, или кликни да би га изабрао'
            />
            <TextInput 
              value={newWebsite} 
              onChange={handleNewWebsiteChange} 
              type={"text"} 
              placeholder='Унеси нови линк овде типа https://...'
            />
            <TextInput 
              value={newName} 
              onChange={handleNewNameChange} 
              type={"text"} 
              placeholder='Унеси ново име овде'
            />
            <div onClick={updateLink} className='update-link__button'>
              <Button text='Промени'/>
            </div>
            <img src="cross.png" alt="cross" className='link-cross' onClick={closePopup}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default LinkSite;
