import React, { useCallback } from 'react';
import './form-elements.css';
import { useDropzone } from 'react-dropzone';

interface VideoUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ files, onFilesChange }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesChange([...files, ...acceptedFiles]);
    },
    [files, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className='video-upload'>
      <input {...getInputProps()} />
      <img src="video-upload.png" alt="video-upload" className='upload-image'/>
      {
        isDragActive ?
          <p>Убаци видео овде</p> :
          <p>Превуци видео овде, или кликни да би га изабрао</p>
      }
    </div>
  );
};

export default VideoUpload;
