import React, { useState } from 'react';
import './link.css';
import TextInput from '../form-elements/TextInput';
import FileUpload from '../form-elements/FileUpload';
import Button from '../button/Button';
import { useAuth } from '../../AuthContext';
import ConformationDialog from '../conformation-dialog/ConformationDialog';
import { LinkProps, FileType } from '../../pages/links/helpers';


const LinkSite: React.FC<LinkProps> = ({ id, logo, website, name, onDelete, onUpdate }) => {

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newName, setNewName] = useState(name);
  const [newWebsite, setNewWebsite] = useState(website);
  const {isAdmin} = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updatePopUp = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  function handleUpdateLink(){
    onUpdate({file: newFile, name: newName, website: newWebsite, linkToUpdateId: id})
    setNewFile(null)
    setIsPopupVisible(false)
  }

  const handleNewFileChange = (file: File | null) => {
    setNewFile(file);
  };

  const handleNewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNewWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWebsite(e.target.value);
  };

  return (
    <div className='link-container'>
      {isDialogOpen && (
        <ConformationDialog onConfirm={()=>{onDelete(id)}} onClose={()=>{setIsDialogOpen(false)}} />
      )}
      <div className='link'>
        <a href={website} target='_blank' className='link-content' style={isAdmin ? { width: 'calc(100% - 50px)' } : { width: '100%' }}>
          <img src={logo} alt="link-logo" className='link-logo'/>
          <h2>{name}</h2>
        </a>
        { isAdmin && (
            <div className='link-admin__container'>
              <img src="refresh.png" alt="upload" className='link-admin link-update' onClick={updatePopUp} />
              <img src="bin.png" alt="bin" className='link-admin link-delete' onClick={()=>{setIsDialogOpen(true)}} />
            </div>
          )
        }
      </div>
      {isPopupVisible && isAdmin && (
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
            <div onClick={handleUpdateLink} className='update-link__button'>
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
