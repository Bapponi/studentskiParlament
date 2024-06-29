import React, { useState } from 'react';
import './create-news.css';
import ElementOptions from './ElementOptions';
import Button from '../button/Button';
import TextInput from '../form-elements/TextInput';
import PhotoUpload from '../form-elements/PhotoUpload';

enum FileType {
  Photo = 1,
  Video,
  Pdf
}

function CreateNews() {

  const [titleValue, setTitleValue] = useState('');
  const [uploadedBanner, setUploadedBanner] = useState<File | null>(null);
  const [elements, setElements] = useState<number[]>([]);
  const [headerValues, setHeaderValues] = useState<{ [key: number]: string }>({});
  const [textValues, setTextValues] = useState<{ [key: number]: string }>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: File | null }>({});
  const [uploadedVideos, setUploadedVideos] = useState<{ [key: number]: File[] }>({});

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleBannerChange = (file: File | null) => {
    setUploadedBanner(file);
  };

  const addElement = () => {
    setElements([...elements, elements.length + 1]);
  };

  const publishNews = () => {
    console.log(uploadedBanner)
    console.log(titleValue)
    console.log(elements, headerValues, textValues, uploadedFiles, uploadedVideos);
  };

  const handleHeaderChange = (id: number, value: string) => {
    setHeaderValues({ ...headerValues, [id]: value });
  };

  const handleTextChange = (id: number, value: string) => {
    setTextValues({ ...textValues, [id]: value });
  };

  const handleFilesChange = (id: number, files: File | null) => {
    setUploadedFiles({ ...uploadedFiles, [id]: files });
  };

  const handleVideoFilesChange = (id: number, files: File[]) => {
    setUploadedVideos({ ...uploadedVideos, [id]: files });
  };

  return (
    <div className='create-news'>
      <h1>Креирај нову вест</h1>
      <div className='news-part'>
        <div className='name-icon'>
            <h2>Наслов</h2>
            <img src="header.png" alt="header" className='add-image'/>  
        </div>
        <TextInput 
                  value={titleValue} 
                  onChange={handleTitleChange} 
                  type={"text"}
                  placeholder='Унесите наслов овде'
                />
      </div>
      <div className='news-part'>
        <div className='name-icon'>
            <h2>Слика Банера</h2>
            <img src="photo.png" alt="header" className='add-image'/>  
        </div>
        <PhotoUpload 
          file={uploadedBanner} 
          onFileChange={handleBannerChange}
          placeholder='Превуци банер овде, или кликни да би га изабрао'
          fileType={FileType.Photo}  
        />
      </div>
      <div className='new-elements__container'>
        <div className="component-list">
          {elements.map((id) => (
            <ElementOptions
              key={id}
              id={id}
              headerValue={headerValues[id] || ''}
              onHeaderChange={handleHeaderChange}
              textValue={textValues[id] || ''}
              onTextChange={handleTextChange}
              uploadedFiles={uploadedFiles[id] || null}
              onFileChange={handleFilesChange}
              uploadedVideos={uploadedVideos[id] || []}
              onVideoFilesChange={handleVideoFilesChange}
            />
          ))}
        </div>
        <div className='new-element__button' onClick={addElement}>
          <div className='add-element'>
            <h2>Додај нови елемент</h2>
            <img src="add.png" alt="add" className='add-image'/>
          </div>
        </div>
        <div onClick={publishNews}>
          <Button text='Објави вест'/>
        </div>
      </div>
    </div>
  );
}

export default CreateNews;
