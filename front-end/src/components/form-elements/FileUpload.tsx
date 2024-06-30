import React, { useCallback, useState } from 'react';
import './form-elements.css';
import { useDropzone } from 'react-dropzone';

enum FileType {
  Photo = 1,
  Video,
  Pdf
}

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  placeholder: string;
  fileType: FileType;
}

const FileUpload: React.FC<FileUploadProps> = ({ file, onFileChange, placeholder, fileType }) => {

  const [error, setError] = useState<boolean>(false);

  const photoRegex: RegExp = /\.(jpe?g|png|gif|bmp|tiff?|webp)$/i;
  const videoRegex: RegExp = /\.(mp4|mkv|avi|mov|wmv|flv|webm|mpeg|mpg|3gp|ogg)$/i;
  const pdfRegex: RegExp = /\.(pdf)$/i;

  const isValidPhoto = (filename: string): boolean => {
    return photoRegex.test(filename);
  };

  const isValidVideo = (filename: string): boolean => {
    return videoRegex.test(filename);
  };

  const isValidPdf = (filename: string): boolean => {
    return pdfRegex.test(filename);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      let hasError = false;

      if (acceptedFiles.length > 0) {
        const fileName = acceptedFiles[0].name;

        if (fileType === FileType.Photo) {
          hasError = !isValidPhoto(fileName);
        } else if (fileType === FileType.Video) {
          hasError = !isValidVideo(fileName);
        } else {
          hasError = !isValidPdf(fileName);
        }

        setError(hasError);

        if (!hasError) {
          onFileChange(acceptedFiles[0]);
        } else {
          onFileChange(null);
        }
      }
    },
    [fileType, onFileChange, isValidPhoto, isValidVideo, isValidPdf]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  return (
    <div {...getRootProps()} className='photo-upload'>
      <input {...getInputProps()} />
      {fileType === FileType.Photo && <img src="photo-upload.png" alt="upload" className='upload-image' />}
      {fileType === FileType.Video && <img src="video-upload.png" alt="upload" className='upload-image' />}
      {fileType === FileType.Pdf && <img src="file-upload.png" alt="upload" className='upload-image' />}
      <div>
        {isDragActive ? (
          <p>Убаци фајл овде</p>
        ) : (
          !file && <p>{placeholder}</p>
        )}
        {file && !error && (
          <div>
            <p>Изабран фајл: {file.name}</p>
          </div>
        )}
        {error && (
          <div>
            <p style={{ color: "var(--primary-color)" }}>
              Није изабран
              {fileType === FileType.Photo && <span>а слика</span>}
              {fileType === FileType.Video && <span> видео</span>}
              {fileType === FileType.Pdf && <span> пдф фајл</span>}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
