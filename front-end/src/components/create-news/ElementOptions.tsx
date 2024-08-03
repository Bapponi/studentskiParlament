import React, { useState } from 'react';
import './create-news.css';
import TextInput from '../form-elements/TextInput';
import TextArea from '../form-elements/TextArea';
import FileUpload from '../form-elements/FileUpload';
import ConformationDialog from '../conformation-dialog/ConformationDialog';

enum FileType {
  Photo = 1,
  Video,
  Pdf
}

interface ElementOptionsProps {
  id: number;
  headerValue?: string;
  onHeaderChange?: (id: number, value: string) => void;
  textValue?: string;
  onTextChange?: (id: number, value: string) => void;
  uploadedFiles?: File | null;
  onFileChange?: (id: number, files: File | null) => void;
  uploadedVideo?: File | null;
  onVideoFileChange?: (id: number, files: File | null) => void;
  onDelete: (id: number) => void;
  headerTitle: string;
}

const ElementOptions: React.FC<ElementOptionsProps> = ({
  id,
  headerValue = '',
  onHeaderChange,
  textValue = '',
  onTextChange,
  uploadedFiles = null,
  onFileChange,
  uploadedVideo = null,
  onVideoFileChange,
  onDelete,
  headerTitle
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [areOptionsVisible, setAreOptionsVisible] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(!!headerValue);
  const [isTextVisible, setIsTextVisible] = useState(!!textValue);
  const [isPictureVisible, setIsPictureVisible] = useState(!!uploadedFiles);
  const [isVideoVisible, setIsVideoVisible] = useState(!!uploadedVideo);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onHeaderChange) {
      onHeaderChange(id, e.target.value);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onTextChange) {
      onTextChange(id, e.target.value);
    }
  };

  const handleFileChange = (file: File | null) => {
    if (onFileChange) {
      onFileChange(id, file);
    }
  };

  const handleVideoFileChange = (file: File | null) => {
    if (onVideoFileChange) {
      onVideoFileChange(id, file);
    }
  };

  const handleDelete = () => {
    onDelete(id);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div>
      {isDialogOpen && (
        <ConformationDialog onConfirm={handleDelete} onClose={()=>{setIsDialogOpen(false)}} />
      )}
      {isVisible && (
        <div className='element-options'>
          {areOptionsVisible && (
            <div className='add-options__container'>
              <div className='add-options'>
                {onHeaderChange && (
                  <div className='add-option' id='header' onClick={() => { setIsHeaderVisible(true); setAreOptionsVisible(false); }}>
                    <h2>{headerTitle}</h2>
                    <img src="header.png" alt="header" className='add-image' />
                  </div>
                )}
                {onTextChange && (
                  <div className='add-option' id='text' onClick={() => { setIsTextVisible(true); setAreOptionsVisible(false); }}>
                    <h2>Текст</h2>
                    <img src="text.png" alt="text" className='add-image' />
                  </div>
                )}
                {onFileChange && (
                  <div className='add-option' id='photo' onClick={() => { setIsPictureVisible(true); setAreOptionsVisible(false); }}>
                    <h2>Слика</h2>
                    <img src="photo.png" alt="galery" className='add-image' />
                  </div>
                )}
                {onVideoFileChange && (
                  <div className='add-option' id='video' onClick={() => { setIsVideoVisible(true); setAreOptionsVisible(false); }}>
                    <h2>Видео</h2>
                    <img src="video.png" alt="video" className='add-image' />
                  </div>
                )}
              </div>
              <img src="cross.png" alt="cross" className='add-image cross-image' onClick={handleDelete} />
            </div>
          )}
          {isHeaderVisible && (
            <div className='header-input'>
              <div className='option-header'>
                <div className='option-name'>
                  <h2>{headerTitle}</h2>
                  <img src="header.png" alt="header" className='add-image' />
                </div>
                <img src="cross.png" alt="cross" className='add-image cross-image' onClick={()=>{setIsDialogOpen(true)}} />
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
                  <img src="text.png" alt="text" className='add-image' />
                </div>
                <img src="cross.png" alt="cross" className='add-image cross-image' onClick={()=>{setIsDialogOpen(true)}} />
              </div>
              <div className='input-area'>
                <TextArea
                  value={textValue}
                  onChange={handleTextChange}
                  placeholder='Унесите текст параграфа овде' />
              </div>
            </div>
          )}
          {isPictureVisible && (
            <div className='picture-input'>
              <div className='option-header'>
                <div className='option-name'>
                  <h2>Слика</h2>
                  <img src="photo.png" alt="galery" className='add-image' />
                </div>
                <img src="cross.png" alt="cross" className='add-image cross-image' onClick={()=>{setIsDialogOpen(true)}} />
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
                  <img src="video.png" alt="video" className='add-image' />
                </div>
                <img src="cross.png" alt="cross" className='add-image cross-image' onClick={()=>{setIsDialogOpen(true)}} />
              </div>
              <div className='input-area'>
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
