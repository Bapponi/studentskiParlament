import React, { useState } from 'react';
import './create-news.css';
import ElementOptions from './ElementOptions';
import Button from '../button/Button';
import TextInput from '../form-elements/TextInput';
import FileUpload from '../form-elements/FileUpload';
import TextArea from '../form-elements/TextArea';
import { useNews } from '../../hooks/newsHooks/useNews';
import { MessageBoxTypes } from '../../pages/news/helpers';
import MessageBox from '../message-box/MessageBox';

enum FileType {
  Photo = 1,
  Video,
  Pdf
}

function CreateNews() {

  const [title, setTitle] = useState('');
  const [clip, setClip] = useState('');
  const [banner, setBanner] = useState<File | null>(null);
  const [elements, setElements] = useState<number[]>([]);
  const [headerValues, setHeaderValues] = useState<{ [key: number]: string }>({});
  const [textValues, setTextValues] = useState<{ [key: number]: string }>({});
  const [uploadedPictures, setUploadedPictures] = useState<{ [key: number]: File | null }>({});
  const [uploadedVideos, setUploadedVideos] = useState<{ [key: number]: File | null }>({});
  const {createNews, isLoadingCreate, createError, createInfo} = useNews(undefined, undefined);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleClipChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setClip(e.target.value);
  };

  const handleBannerChange = (file: File | null) => {
    setBanner(file);
  };

  const addElement = () => {
    setElements([...elements, elements.length + 1]);
  };

  const publishNews = async () => {
    createNews({banner, title, clip, elements, headerValues, textValues, uploadedPictures, uploadedVideos});
    setBanner(null);
    setTitle('');
    setClip('');
    setElements([]);
    setHeaderValues([]);
    setTextValues([]);
    setUploadedPictures([]);
    setUploadedVideos([]);
  };

  const handleHeaderChange = (id: number, value: string) => {
    setHeaderValues({ ...headerValues, [id]: value });
  };

  const handleTextChange = (id: number, value: string) => {
    setTextValues({ ...textValues, [id]: value });
  };

  const handlePicturesChange = (id: number, files: File | null) => {
    setUploadedPictures({ ...uploadedPictures, [id]: files });
  };

  const handleVideosChange = (id: number, files: File | null) => {
    setUploadedVideos({ ...uploadedVideos, [id]: files });
  };

  const handleDeleteElement = (id: number) => {
    setElements(elements.filter(elementId => elementId !== id));
    const { [id]: _, ...newHeaderValues } = headerValues;
    setHeaderValues(newHeaderValues);
    const { [id]: __, ...newTextValues } = textValues;
    setTextValues(newTextValues);
    const { [id]: ___, ...newUploadedPictures } = uploadedPictures;
    setUploadedPictures(newUploadedPictures);
    const { [id]: ____, ...newUploadedVideos } = uploadedVideos;
    setUploadedVideos(newUploadedVideos);
  };

  return (
    <div className='create-news'>
      <h1>Креирај нову вест</h1>
      <div className='news-part'>
        <div className='name-icon'>
            <h2>Наслов</h2>
            <img src="header.png" alt="header" className='add-image' />  
        </div>
        <TextInput 
          value={title} 
          onChange={handleTitleChange} 
          type={"text"}
          placeholder='Унесите наслов вести овде'
        />
      </div>
      <div className='news-part'>
        <div className='name-icon'>
            <h2>Исечак текста</h2>
            <img src="header.png" alt="header" className='add-image' />  
        </div>
        <TextArea
          value={clip} 
          onChange={handleClipChange}
          placeholder='Унети максимално 200 карактера'
        />
      </div>
      <div className='news-part'>
        <div className='name-icon'>
            <h2>Слика Банера</h2>
            <img src="photo.png" alt="header" className='add-image' />  
        </div>
        <FileUpload 
          file={banner} 
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
              uploadedFiles={uploadedPictures[id] || null}
              onFileChange={handlePicturesChange}
              uploadedVideo={uploadedVideos[id] || null}
              onVideoFileChange={handleVideosChange}
              onDelete={handleDeleteElement}
              headerTitle='Заглавље'
              single={false}
            />
          ))}
        </div>
        <div className='new-element__button' onClick={addElement}>
          <div className='add-element'>
            <h2>Додај нови елемент</h2>
            <img src="add.png" alt="add" className='add-image' />
          </div>
        </div>
        <div onClick={publishNews}>
          <Button text='Објави вест' />
        </div>
      </div>
      {(createError) && 
        <MessageBox text={createError} infoType={MessageBoxTypes.Error}/>
      }
      {(createInfo) && 
        <MessageBox text={createInfo} infoType={MessageBoxTypes.Info}/>
      }
      {isLoadingCreate && <MessageBox text='Прављење нове вести...' infoType={MessageBoxTypes.Loading}/>}
    </div>
  );
}

export default CreateNews;
