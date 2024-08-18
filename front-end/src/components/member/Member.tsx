import React, { useState } from 'react';
import './member.css'
import Button from '../button/Button';
import TextInput from '../form-elements/TextInput';
import FileUpload from '../form-elements/FileUpload';
import TextArea from '../form-elements/TextArea';
import { useAuth } from '../../AuthContext';
import SelectOption from '../form-elements/SelectOption';
import ConformationDialog from '../conformation-dialog/ConformationDialog';
import { MemberProps, FileType, positionOptions, roleOptions } from '../../pages/members/helpers';
  
const Member: React.FC<MemberProps> = ({
    id,
    position,
    name,
    email,
    bio,
    memberImg,
    roleId,
    onDelete,
    onUpdate,
  }) => {

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPosition, setNewPosition] = useState(position);
  const [newBio, setNewBio] = useState(bio);
  const [newRoleId, setNewRoleId] = useState(roleId);
  const {isAdmin} = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updatePopUp = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  function handleUpdateMember(){
    onUpdate({memberToUpdateId: id, file: newFile, name: newName, email: newEmail, position: newPosition, bio: newBio, roleId: newRoleId})
    setNewFile(null)
    setIsPopupVisible(false)
  }

  const handleNewFileChange = (file: File | null) => {
    setNewFile(file);
  };

  const handleNewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNewEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleNewPositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewPosition(e.target.value);
  };

  const handleNewBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBio(e.target.value);
  };

  const handleNewRoleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewRoleId(parseInt(e.target.value));
  };

  return (
    <div className='member-container'>
      {isDialogOpen && (
        <ConformationDialog onConfirm={()=>{onDelete(id)}} onClose={()=>{setIsDialogOpen(false)}} />
      )}
      {roleId == 1 && (
        <div className='admin-member'>
          <img src={memberImg} alt="member" className='member-image'/>
          <div>
            <div className='admin-member__text'>
              <h2>
                <div className='member-text'>
                  <span style={{color: "var(--primary-color)"}}>
                    {name}
                  </span>
                  <span>
                    {position}
                  </span>
                </div>
              </h2>
              {isAdmin && (
                <div className='member-admin__container'>
                  <img src="refresh.png" alt="upload" className='member-admin member-update' onClick={updatePopUp} />
                  <img src="bin.png" alt="bin" className='member-admin member-delete' onClick={()=>{setIsDialogOpen(true)}}/>
                </div>
              )}
            </div>
            <p>{bio}</p>
          </div>
        </div>
      )}
      {roleId == 3 && (
        <div className='other-member'>
          <h2>
            <div className='member-text'>
              <span style={{color: "var(--primary-color)"}}>
                {name}
              </span>
              <span>
                {position}
              </span>
            </div>
          </h2>
          {isAdmin && (
            <div className='member-admin__container'>
              <img src="refresh.png" alt="upload" className='member-admin member-update' onClick={updatePopUp} />
              <img src="bin.png" alt="bin" className='member-admin member-delete' onClick={()=>{setIsDialogOpen(true)}}/>
            </div>
          )}
        </div>
      )}
      {isPopupVisible && isAdmin && (
        <div className='popup'>
          <div className='popup-content'>
            <h2>Промени Члана</h2>
            <FileUpload 
              file={newFile} 
              onFileChange={handleNewFileChange} 
              placeholder='Превуци нови лого овде, или кликни да би га изабрао'
              fileType={FileType.Photo}
            />
            <TextInput 
              value={newName} 
              onChange={handleNewNameChange} 
              type={"text"} 
              placeholder='Унеси ново име овде'
            />
            <TextInput 
              value={newEmail} 
              onChange={handleNewEmailChange} 
              type={"text"} 
              placeholder='Унеси нов мејл овде'
            />
            <SelectOption
              value={newPosition}
              onChange={handleNewPositionChange}
              options={positionOptions}
              placeholder='Унеси позицију члана'
            />
            <TextArea
              value={newBio} 
              onChange={handleNewBioChange}
              placeholder='Унеси нову биографију овде'
            />
            <SelectOption
              value={newRoleId.toString()}
              onChange={handleNewRoleIdChange}
              options={roleOptions}
              placeholder='Унеси ролу члана'
            />
            <div onClick={handleUpdateMember} className='update-member__button'>
              <Button text='Промени'/>
            </div>
            <img src="cross.png" alt="cross" className='member-cross' onClick={closePopup}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Member;