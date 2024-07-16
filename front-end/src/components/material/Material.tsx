import React, { useState } from 'react';
import './material.css'
import Button from '../button/Button';
import TextInput from '../form-elements/TextInput';
import FileUpload from '../form-elements/FileUpload';
import { useAuth } from '../../AuthContext';

enum FileType {
  Photo = 1,
  Video,
  Pdf
}

interface MaterialProps {
  id: number;
  documentLink: string;
  title: string;
  onDelete: (id: number) => void;
}
    
  const Material: React.FC<MaterialProps> = ({id, title, documentLink, onDelete}) => {
  
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [newFile, setNewFile] = useState<File | null>(null);
    const [newTitle, setNewTitle] = useState(title);
    const [newDocumentLink, setNewDocumentLink] = useState(documentLink);
    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentDocumentLink, setCurrentDocumentLink] = useState(documentLink);
    const {isLoggedIn} = useAuth();
  
    const deleteMaterial = async () => {
      try {
        const response = await fetch(`http://localhost:8000/material/${id}`, {
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
  
    const updateMaterial = async () => {
      try {
        const formData = new FormData();
        if (newFile) {
          formData.append('file', newFile);
        }
        formData.append('title', newTitle);
    
        const response = await fetch(`http://localhost:8000/material/${id}`, {
          method: 'PUT',
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error('Неуспешно ажуриран линк!');
        } else {
          const updatedMaterial = await response.json();
          setCurrentTitle(updatedMaterial.title);
          setCurrentDocumentLink(updatedMaterial.documentLink);
        }
    
        setIsPopupVisible(false);
      } catch (error) {
        console.error('Грешка приликом ажурирања линка:', error);
      }
    };
  
    const handleNewFileChange = (file: File | null) => {
      setNewFile(file);
    };
  
    const handleNewTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.target.value);
    };
  
    return (
    <div className='material-container'>
      <a href={currentDocumentLink} target='blank' className='material'>
        <img src="document.png" alt="document" className='document-image'/>
        <h2>{currentTitle}</h2>
      </a>
      { isLoggedIn && (
        <div>
          <img src="bin.png" alt="bin" className='material-admin material-delete' onClick={deleteMaterial} />
          <img src="refresh.png" alt="upload" className='material-admin material-update' onClick={updatePopUp} />
        </div>
      )}
      {isPopupVisible && isLoggedIn && (
        <div className='popup'>
          <div className='popup-content'>
            <h2>Промени Materijal</h2>
            <FileUpload 
              file={newFile} 
              onFileChange={handleNewFileChange} 
              placeholder='Превуци нови лого овде, или кликни да би га изабрао'
              fileType={FileType.Pdf}
            />
            <TextInput 
              value={newTitle} 
              onChange={handleNewTitleChange} 
              type={"text"} 
              placeholder='Унеси нови наслов овде'
            />
            <div onClick={updateMaterial} className='update-material__button'>
              <Button text='Промени'/>
            </div>
            <img src="cross.png" alt="cross" className='material-cross' onClick={closePopup}/>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default Material;