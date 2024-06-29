import React, { useCallback } from 'react';
import './form-elements.css';
import { useDropzone } from 'react-dropzone';

enum FileType {
  Photo = 1,
  Video,
  Pdf
}

interface PhotoUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  placeholder: string;
  fileType: FileType;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ file, onFileChange, placeholder, fileType }) => {
  
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      
      if (fileType === FileType.Photo) {
        console.log("Photo");
      } else if (fileType === FileType.Video) {
        console.log("Video");
      } else {
        console.log("PDF");
      }

      if (acceptedFiles.length > 0) {
        onFileChange(acceptedFiles[0]);
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
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
