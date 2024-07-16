import React, { useState } from 'react';
import './link.css';
import TextInput from '../form-elements/TextInput';
import FileUpload from '../form-elements/FileUpload';
import Button from '../button/Button';
import { useAuth } from '../../AuthContext';

enum FileType {
  Photo = 1,
  Video,
  Pdf
}

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
  const [currentLogo, setCurrentLogo] = useState(logo);
  const {isLoggedIn} = useAuth();

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
      const formData = new FormData();
      if (newFile) {
        formData.append('file', newFile);
      }
      formData.append('website', newWebsite); // Ensure newWebsite is correctly set
      formData.append('name', newName);
  
      const response = await fetch(`http://localhost:8000/link/${id}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Неуспешно ажуриран линк!');
      } else {
        const updatedLink = await response.json();
        setCurrentWebsite(updatedLink.website);
        setCurrentName(updatedLink.name);
        setCurrentLogo(updatedLink.logo);
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
        <img src={currentLogo} alt="link-logo" className='link-logo' />
        <h2>{currentName}</h2>
      </a>
      { isLoggedIn && (
          <div>
            <img src="bin.png" alt="bin" className='link-admin link-delete' onClick={deleteLink} />
            <img src="refresh.png" alt="upload" className='link-admin link-update' onClick={updatePopUp} />
          </div>
        )
      }
      {isPopupVisible && isLoggedIn && (
        <div className='popup'>
          <div className='popup-content'>
            <h2>Промени Линк</h2>
            <FileUpload 
              file={newFile} 
              onFileChange={handleNewFileChange} 
              placeholder='Превуци нови лого овде, или кликни да би га изабрао'
              fileType={FileType.Photo}
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
