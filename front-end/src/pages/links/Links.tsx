import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import Link from '../../components/link/Link';
import Button from '../../components/button/Button';
import './links.css';
import TextInput from '../../components/form-elements/TextInput';
import FileUpload from '../../components/form-elements/FileUpload';
import { useAuth } from '../../AuthContext';
import { useLinks } from '../../hooks/linkHooks/useLink';
import { FileType, MessageBoxTypes } from './helpers';
import MessageBox from '../../components/message-box/MessageBox';

const Links: React.FC = () => {
  const {links, isLoadingFetch, fetchError,
    createLink, isLoadingCreate, createError, createInfo,
    deleteLink, isLoadingDelete, deleteError, deleteInfo,
    updateLink, isLoadingUpdate, updateError, updateInfo,
  } = useLinks();
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const {isAdmin} = useAuth();

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };

  function handleCreateLink(){
    createLink({file, website, name});
    setName('');
    setWebsite('');
    setFile(null)
  }

  const handleDelete = (id: number) => {
    deleteLink({linkToDeleteId: id});
  };

  return (
    <div>
      <Banner title='ЛИНКОВИ' bannerImg='ztf.png'/>
      <div className='links'>
        {links && links.map((entry) => (
          <Link key={entry.id} {...entry} onDelete={handleDelete} onUpdate={updateLink}/>
        ))}
      </div>
      { isAdmin && (
        <div className='create-link'>
          <h2>Креирај нови линк</h2>
          <FileUpload 
            file={file} 
            onFileChange={handleFileChange} 
            placeholder='Превуци лого овде, или кликни да би га изабрао'
            fileType={FileType.Photo}
          />
          <TextInput 
            value={website} 
            onChange={handleWebsiteChange} 
            type={"text"} 
            placeholder='Унеси линк овде типа https://...'
          />
          <TextInput 
            value={name} 
            onChange={handleNameChange} 
            type={"text"}
            placeholder='Унеси назив фајла'
          />
          <div onClick={handleCreateLink} style={{width: "100%"}}>
            <Button text='Додај'/>
          </div>
          {(deleteError || fetchError || createError || updateError) && 
            <MessageBox text={deleteError || fetchError || createError || updateError} infoType={MessageBoxTypes.Error}/>
          }
          {(deleteInfo || createInfo || updateInfo) && 
            <MessageBox text={deleteInfo || createInfo || updateInfo} infoType={MessageBoxTypes.Info}/>
          }
          {isLoadingFetch && <MessageBox text='Учитавају се сви линкови...' infoType={MessageBoxTypes.Loading}/>}
          {isLoadingCreate && <MessageBox text='Креирање новог линк...' infoType={MessageBoxTypes.Loading}/>}
          {isLoadingDelete && <MessageBox text='Брисање линка...' infoType={MessageBoxTypes.Loading}/>}
          {isLoadingUpdate && <MessageBox text='Ажурирање линка...' infoType={MessageBoxTypes.Loading}/>}
        </div>
      )}
    </div>
  );
}

export default Links;