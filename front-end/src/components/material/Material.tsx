import React, { useState } from 'react';
import './material.css'
import Button from '../button/Button';
import TextInput from '../form-elements/TextInput';
import FileUpload from '../form-elements/FileUpload';
import { useAuth } from '../../AuthContext';
import ConformationDialog from '../conformation-dialog/ConformationDialog';
import { FileType, MaterialProps } from '../../pages/materials/helpers';
    
const Material: React.FC<MaterialProps> = ({id, title, documentLink, onDelete, onUpdate}) => {

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newTitle, setNewTitle] = useState(title);
  const {isAdmin} = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const updatePopUp = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };
  function handleUpdateMaterial(){
    onUpdate({file: newFile, title: newTitle, materialToUpdateId: id})
    setNewFile(null)
    setIsPopupVisible(false)
  }

  const handleNewFileChange = (file: File | null) => {
    setNewFile(file);
  };

  const handleNewTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  return (
  <div className='material-container'>
    {isDialogOpen && (
      <ConformationDialog onConfirm={()=>{onDelete(id)}} onClose={()=>{setIsDialogOpen(false)}} />
    )}
    <div className='material'>
      <a href={documentLink} target='blank' className='material-content'>
        <img src="document.png" alt="document" className='document-image'/>
        <h2>{title}</h2>
      </a>
      { isAdmin && (
        <div className='material-admin__container'>
          <img src="bin.png" alt="bin" className='material-admin material-delete' onClick={()=>{setIsDialogOpen(true)}} />
          <img src="refresh.png" alt="upload" className='material-admin material-update' onClick={updatePopUp} />
        </div>
      )}
    </div>
    {isPopupVisible && isAdmin && (
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
          <div onClick={handleUpdateMaterial} className='update-material__button'>
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