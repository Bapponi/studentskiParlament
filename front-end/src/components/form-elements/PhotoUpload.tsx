import React, { useCallback } from 'react';
import './form-elements.css';
import { useDropzone } from 'react-dropzone';

function PhotoUpload() {

  const onDrop = useCallback((acceptedFiles: File[]) => {

  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='photo-upload'>
      <input {...getInputProps()} />
      <img src="photo-upload.png" alt="photo-upload" className='upload-image'/>
      {
        isDragActive ?
          <p>Убаци слику овде</p> :
          <p>Превуци слику овде, или кликни да би је изабрао</p>
      }
    </div>
  );
}

export default PhotoUpload;