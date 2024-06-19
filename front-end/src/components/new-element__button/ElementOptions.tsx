import React, { useState } from 'react';
import './new-element-button.css'
import TextInput from '../form-elements/TextInput';
import TextArea from '../form-elements/TextArea';
import PhotoUpload from '../form-elements/PhotoUpload';
import VideoUpload from '../form-elements/VideoUpload';

interface ElementOptionsProps {
  id: number;
  headerValue: string;
  onHeaderChange: (id: number, value: string) => void;
  textValue: string;
  onTextChange: (id: number, value: string) => void;
  uploadedFiles: File[];
  onFilesChange: (id: number, files: File[]) => void;
  uploadedVideos: File[];
  onVideoFilesChange: (id: number, files: File[]) => void;
}

const ElementOptions: React.FC<ElementOptionsProps> = ({
  id,
  headerValue,
  onHeaderChange,
  textValue,
  onTextChange,
  uploadedFiles,
  onFilesChange,
  uploadedVideos,
  onVideoFilesChange
}) => {

  const [isVisible, setIsVisible] = useState(true);
  const [areOptionsVisible, setAreOptionsVisible] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isPictureVisible, setIsPictureVisible] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onHeaderChange(id, e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(id, e.target.value);
  };

  const handleFilesChange = (files: File[]) => {
    onFilesChange(id, files);
  };

  const handleVideoFilesChange = (files: File[]) => {
    onVideoFilesChange(id, files);
  };

  return (
    <div>
      {isVisible && (
        <div className='element-options'>
          {areOptionsVisible && (
            <div className='add-options__container'>
              <div className='add-options'>
                <div className='add-option' id='header' onClick={() => {setIsHeaderVisible(true); setAreOptionsVisible(false);}}>
                  <h2>Заглавље</h2>
                  <img src="header.png" alt="header" className='add-image'/>
                </div>
                <div className='add-option' id='text' onClick={() => {setIsTextVisible(true); setAreOptionsVisible(false);}}>
                  <h2>Текст</h2>
                  <img src="text.png" alt="text" className='add-image'/>
                </div>
                <div className='add-option' id='photo' onClick={() => {setIsPictureVisible(true); setAreOptionsVisible(false);}}>
                  <h2>Слика</h2>
                  <img src="photo.png" alt="galery" className='add-image'/>
                </div>
                <div className='add-option' id='video' onClick={() => {setIsVideoVisible(true); setAreOptionsVisible(false);}}>
                  <h2>Видео</h2>
                  <img src="video.png" alt="video" className='add-image'/>
                </div>
              </div>
            <img src="cross.png" alt="cross" className='add-image cross-image' onClick={() => {setIsVisible(false); setAreOptionsVisible(false);}}/>
          </div>
          )}
          {isHeaderVisible && (
            <div className='header-input'>
                <div className='option-header'>
                <div className='option-name'>
                    <h2>Заглавље</h2>
                    <img src="header.png" alt="header" className='add-image'/>
                </div>
                <img src="cross.png" alt="cross" className='add-image cross-image' onClick={() => setIsVisible(false)}/>
                </div>
                <div className='input-area'>
                <TextInput value={headerValue} onChange={handleHeaderChange}/>
                </div>
            </div>
          )}
          {isTextVisible && (
            <div className='text-input'>
                <div className='option-header'>
                <div className='option-name'>
                    <h2>Текст</h2>
                    <img src="text.png" alt="text" className='add-image'/>
                </div>
                <img src="cross.png" alt="cross" className='add-image cross-image' onClick={() => setIsVisible(false)}/>
                </div>
                <div className='input-area'>
                <TextArea value={textValue} onChange={handleTextChange}/>
                </div>
            </div>
          )}
          {isPictureVisible && (
            <div className='picture-input'>
                <div className='option-header'>
                <div className='option-name'>
                    <h2>Слика</h2>
                    <img src="photo.png" alt="galery" className='add-image'/>
                </div>
                <img src="cross.png" alt="cross" className='add-image cross-image' onClick={() => setIsVisible(false)}/>
                </div>
                <div className='input-area'>
                <PhotoUpload files={uploadedFiles} onFilesChange={handleFilesChange}/>
                </div>
            </div>
          )}
          {isVideoVisible && (
          <div className='video-input'>
              <div className='option-header'>
              <div className='option-name'>
                  <h2>Видео</h2>
                  <img src="video.png" alt="video" className='add-image'/>
              </div>
              <img src="cross.png" alt="cross" className='add-image cross-image' onClick={() => setIsVisible(false)}/>
              </div>
              <div className='input-area'>
              <VideoUpload files={uploadedVideos} onFilesChange={handleVideoFilesChange}/>
              </div>
          </div>
          )}
        </div>
      )}
    </div>
    
  );
}

export default ElementOptions;