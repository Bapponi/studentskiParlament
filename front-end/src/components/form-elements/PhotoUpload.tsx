import React, { useCallback } from 'react';
import './form-elements.css';
import { useDropzone } from 'react-dropzone';

interface PhotoUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  placeholder: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ file, onFileChange, placeholder }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileChange(acceptedFiles[0]); // Only set the first file
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Disallow multiple files
  });

  return (
    <div {...getRootProps()} className='photo-upload'>
      <input {...getInputProps()} />
      <img src="photo-upload.png" alt="upload" className='upload-image'/>
      {
        isDragActive ?
          <p>Убаци фајл овде</p> :
        (!file && 
          <p>{placeholder}</p>
        )  
      }
      {file && (
        <div>
          <p>Изабран фајл: {file.name}</p>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
