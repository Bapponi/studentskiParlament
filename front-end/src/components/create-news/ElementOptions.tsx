import React, { useState } from 'react';
import './create-news.css'
import TextInput from '../form-elements/TextInput';
import TextArea from '../form-elements/TextArea';
import FileUpload from '../form-elements/FileUpload';

enum FileType {
  Photo = 1,
  Video,
  Pdf
}

interface ElementOptionsProps {
  id: number;
  headerValue: string;
  onHeaderChange: (id: number, value: string) => void;
  textValue: string;
  onTextChange: (id: number, value: string) => void;
  uploadedFiles: File | null;
  onFileChange: (id: number, files: File | null) => void;
  uploadedVideo: File | null;
  onVideoFileChange: (id: number, files: File | null) => void;
}

const ElementOptions: React.FC<ElementOptionsProps> = ({
  id,
  headerValue,
  onHeaderChange,
  textValue,
  onTextChange,
  uploadedFiles,
  onFileChange,
  uploadedVideo,
  onVideoFileChange
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

  const handleFileChange = (files: File | null) => {
    onFileChange(id, files);
  };

  const handleVideoFileChange = (files: File | null) => {
    onVideoFileChange(id, files);
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
                <TextInput 
                  value={headerValue} 
                  onChange={handleHeaderChange} 
                  type={"text"}
                  placeholder='Унесите заглавље овде'
                />
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
                <TextArea 
                  value={textValue} 
                  onChange={handleTextChange}
                  placeholder='Унесите текст параграфа овде'/>
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
                <FileUpload 
                  file={uploadedFiles} 
                  onFileChange={handleFileChange}
                  placeholder='Превуци слику овде, или кликни да би је изабрао'
                  fileType={FileType.Photo}
                />
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
              {/* <VideoUpload files={uploadedVideos} onFilesChange={handleVideoFilesChange}/> */}
                <FileUpload 
                  file={uploadedVideo} 
                  onFileChange={handleVideoFileChange}
                  placeholder='Превуци видео овде, или кликни да би га изабрао'
                  fileType={FileType.Video}
                />
              </div>
          </div>
          )}
        </div>
      )}
    </div>
    
  );
}

export default ElementOptions;