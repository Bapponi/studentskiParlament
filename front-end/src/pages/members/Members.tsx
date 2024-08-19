import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import Member from '../../components/member/Member';
import './members.css';
import FileUpload from '../../components/form-elements/FileUpload';
import TextInput from '../../components/form-elements/TextInput';
import Button from '../../components/button/Button';
import TextArea from '../../components/form-elements/TextArea';
import { useAuth } from '../../AuthContext';
import SelectOption from '../../components/form-elements/SelectOption';
import { MemberProps, FileType, MessageBoxTypes, roleOptions, positionOptions } from './helpers';
import { useMembers } from '../../hooks/memberHooks/useMember';
import MessageBox from '../../components/message-box/MessageBox';

const Members: React.FC = () => {
  const {adminMembers, otherMembers, isLoadingFetch, fetchError,
    createMember, isLoadingCreate, createError, createInfo, 
    deleteMember, isLoadingDelete, deleteError, deleteInfo,
    updateMember, isLoadingUpdate, updateError, updateInfo
   } = useMembers();

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [roleId, setRoleId] = useState<string>('');
  const {isAdmin} = useAuth();

  const handleFileChange = (file: File | null) => {
  setFile(file);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleRoleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleId(e.target.value);
  };

  function handleCreateMember(){
    createMember({file, name, email, position, bio, roleId: parseInt(roleId)});
    setName('');
    setBio('');
    setEmail('');
    setPosition('');
    setRoleId('');
    setFile(null)
  }

  const handleDelete = (id: number) => {
    deleteMember({memberToDeleteId: id});
  };

  const chunkSize = 6;
  const chunks = [];

  if(otherMembers){
    for (let i = 0; i < otherMembers.length; i += chunkSize) {
      chunks.push(otherMembers.slice(i, i + chunkSize));
    }
  }

  return (
    <div>
      <Banner title='ЧЛАНОВИ' bannerImg='ztf.png' />
      <div className='all-members'>
        <div className='main-members'>
          {adminMembers && adminMembers.map((entry) => (
            <Member key={entry.id} {...entry} onDelete={handleDelete} onUpdate={updateMember}/>
          ))}
        </div>
        <div className='other-members'>
          {chunks.map((chunk, index) => (
            <div key={index} className='other-members__column'>
              {chunk.map((entry, idx) => (
                <Member key={idx} {...entry} onDelete={handleDelete} onUpdate={updateMember}/>
              ))}
            </div>
          ))}
        </div>
      </div>
      {
        isAdmin && (
          <div className='create-member'>
            <h2>Креирај новог члана</h2>
            <FileUpload
              file={file}
              onFileChange={handleFileChange}
              placeholder='Опционо превуци слику члана овде, или кликни да би је изабрао'
              fileType={FileType.Photo}
            />
            <TextInput
              value={name}
              onChange={handleNameChange}
              type={"text"}
              placeholder='Унеси име и презиме члана'
            />
            <TextInput
              value={email}
              onChange={handleEmailChange}
              type={"text"}
              placeholder='Унеси мејл члана'
            />
            <SelectOption
              value={position}
              onChange={handlePositionChange}
              options={positionOptions}
              placeholder='Унеси позицију члана'
            />
            <TextArea
              value={bio}
              onChange={handleBioChange}
              placeholder='Опционо унеси биографију члана'
            />
            <SelectOption
              value={roleId}
              onChange={handleRoleIdChange}
              options={roleOptions}
              placeholder='Унеси ролу члана'
            />
            <div onClick={handleCreateMember} style={{ width: "100%" }}>
              <Button text='Додај' />
            </div>
            {(deleteError || fetchError || createError || updateError) && 
              <MessageBox text={deleteError || fetchError || createError || updateError} infoType={MessageBoxTypes.Error}/>
            }
            {(deleteInfo || createInfo || updateInfo) && 
              <MessageBox text={deleteInfo || createInfo || updateInfo} infoType={MessageBoxTypes.Info}/>
            }
            {isLoadingFetch && <MessageBox text='Учитавају се сви материјали...' infoType={MessageBoxTypes.Loading}/>}
            {isLoadingCreate && <MessageBox text='Креирање новог материјала...' infoType={MessageBoxTypes.Loading}/>}
            {isLoadingDelete && <MessageBox text='Брисање материјала...' infoType={MessageBoxTypes.Loading}/>}
            {isLoadingUpdate && <MessageBox text='Ажурирање материјала...' infoType={MessageBoxTypes.Loading}/>}
          </div>
        )
      }
    </div>
  );
}

export default Members;
