import React, { useState } from 'react';
import './member.css'
import Button from '../button/Button';
import TextInput from '../form-elements/TextInput';
import FileUpload from '../form-elements/FileUpload';
import TextArea from '../form-elements/TextArea';
import { useAuth } from '../../AuthContext';
import SelectOption from '../form-elements/SelectOption';
import ConformationDialog from '../conformation-dialog/ConformationDialog';

enum FileType {
  Photo = 1,
  Video,
  Pdf
}

interface MemberProps {
  id: number;
  position: string;
  name: string;
  bio: string;
  memberImg: string;
  roleId: number;
  onDelete: (id: number) => void;
}
  
const Member: React.FC<MemberProps> = ({
    id,
    position,
    name,
    bio,
    memberImg,
    roleId,
    onDelete,
  }) => {

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newName, setNewName] = useState(name);
  const [newPosition, setNewPosition] = useState(position);
  const [newBio, setNewBio] = useState(bio);
  const [newRoleId, setNewRoleId] = useState(roleId);
  const [currentName, setCurrentName] = useState(name);
  const [currentPosition, setCurrentPosition] = useState(position);
  const [currentBio, setCurrentBio] = useState(bio);
  const [currentRoleId, setCurrentRoleId] = useState(roleId);
  const [currentMemberImg, setCurrentMemberImg] = useState(memberImg);
  const {isAdmin} = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deleteMember = async () => {
    try {
      const response = await fetch(`http://localhost:8000/member/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Неуспешно избрисан члан!');
      }

      onDelete(id);
    } catch (error) {
      console.error('Грешка приликом брисанја члана:', error);
    }
  };

  const updatePopUp = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const updateMember = async () => {
    try {
      const formData = new FormData();
      if (newFile) {
        formData.append('file', newFile);
      }
      formData.append('name', newName);
      formData.append('position', newPosition);
      formData.append('bio', newBio);
      formData.append('roleId', newRoleId.toString());
  
      const response = await fetch(`http://localhost:8000/member/${id}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Неуспешно ажуриран члан!');
      } else {
        const updatedMember = await response.json();
        setCurrentPosition(updatedMember.position);
        setCurrentName(updatedMember.name);
        setCurrentBio(updatedMember.bio);
        setCurrentRoleId(updatedMember.roleId);
        setCurrentBio(updatedMember.bio);
        setCurrentMemberImg(updatedMember.memberImg);
      }
  
      setIsPopupVisible(false);
    } catch (error) {
      console.error('Грешка приликом ажурирања члана:', error);
    }
  };

  const handleNewFileChange = (file: File | null) => {
    setNewFile(file);
  };

  const handleNewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNewPositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewPosition(e.target.value);
  };

  const handleNewBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBio(e.target.value);
  };

  //potencijalno greska
  const handleNewRoleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewRoleId(parseInt(e.target.value));
  };

  const positionOptions = [
    { value: 'председник', label: 'Председник' },
    { value: 'под-председник', label: 'Под-Председник' },
    { value: 'члан', label: 'Члан' },
  ];
  
  const roleOptions = [
    { value: '1', label: 'Админ' },
    { value: '2', label: 'ПР' },
    { value: '3', label: 'Корисник' },
  ];

  return (
    <div className='member-container'>
      {isDialogOpen && (
        <ConformationDialog onConfirm={deleteMember} onClose={()=>{setIsDialogOpen(false)}} />
      )}
      {currentRoleId == 1 && (
        <div className='admin-member'>
          <img src={currentMemberImg} alt="member" className='member-image'/>
          <div>
              <h1 style={{color: "var(--primary-color)"}}>{currentName}</h1>
              <h2>{currentPosition}</h2>
              <p>{currentBio}</p>
          </div>
        </div>
      )}
      {currentRoleId == 3 && (
        <div className='other-member'>
          <h2>
            <center>
              <span style={{color: "var(--primary-color)"}}>
                {currentName}
              </span> - {currentPosition}
            </center>
          </h2>
        </div>
      )}
      {isAdmin && (
        <div>
          <img src="bin.png" alt="bin" className='link-admin link-delete' onClick={()=>{setIsDialogOpen(true)}}/>
          <img src="refresh.png" alt="upload" className='link-admin link-update' onClick={updatePopUp} />
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
              options={positionOptions}
              placeholder='Унеси ролу члана'
            />
            {/* <TextInput 
              value={newRoleId.toString()} 
              onChange={handleNewRoleIdChange} 
              type={"text"} 
              placeholder='Унеси нову ролу овде'
            /> */}
            <div onClick={updateMember} className='update-link__button'>
              <Button text='Промени'/>
            </div>
            <img src="cross.png" alt="cross" className='link-cross' onClick={closePopup}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Member;