import React, { useState } from 'react';
import './admin-panel.css'
import Banner from '../../components/banner/Banner';
import NewElementButton from '../../components/new-element__button/NewElementButton';
import TextInput from '../../components/form-elements/TextInput';
import PhotoUpload from '../../components/form-elements/PhotoUpload';
import Button from '../../components/button/Button';

function AdminPanel() {

  const [titleValue, setTitleValue] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleFilesChange = (files: File[]) => {
    setUploadedFiles(files);
    console.log(files)
  };

  return (
    <div>
      <Banner title='АДМИН' bannerImg='ztf.png'/>
      <div className='create-news'>
        <h1>Креирај нову вест</h1>
        <div className='news-part'>
          <div className='name-icon'>
              <h2>Наслов</h2>
              <img src="header.png" alt="header" className='add-image'/>  
          </div>
          <TextInput value={titleValue} onChange={handleTitleChange}/>
        </div>
        <div className='news-part'>
          <div className='name-icon'>
              <h2>Слика Банера</h2>
              <img src="photo.png" alt="header" className='add-image'/>  
          </div>
          <PhotoUpload files={uploadedFiles} onFilesChange={handleFilesChange}/>
        </div>
        <NewElementButton/>
        <Button text='Објави вест'/>
      </div>
    </div>
  );
}

export default AdminPanel;