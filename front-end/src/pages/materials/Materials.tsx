import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import './materials.css'
import Material from '../../components/material/Material';
import FileUpload from '../../components/form-elements/FileUpload';
import TextInput from '../../components/form-elements/TextInput';
import Button from '../../components/button/Button';
import { useMaterials } from '../../hooks/useMaterials';
import { useAuth } from '../../AuthContext';

enum FileType {
  Photo = 1,
  Video,
  Pdf
}

interface MaterialProps {
  id: number;
  documentLink: string;
  title: string;
  onDelete: (id: number) => void;
}

function Materials() {

  const {materials: hookMaterials, 
    // loading:isLoading, error: hookError,
     uploadMaterial, deleteMaterial} = useMaterials();
  const [materials, setMaterials] = useState<MaterialProps[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const {isLoggedIn} = useAuth();

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  function handleUploadMaterial(){
    uploadMaterial({file:file, title:title});
  }

  const handleDelete = (id: number) => {
    deleteMaterial({id});
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error && isLoading) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      <Banner title='МАТЕРИЈАЛИ' bannerImg='ztf.png'/>
      <div className='materials'>
        {hookMaterials && hookMaterials.map((entry, index) => (
          <Material key={entry.id} {...entry} onDelete={handleDelete} />
        ))}
      </div>
      { isLoggedIn && (
          <div className='create-material'>
            <h2>Креирај нови материјал</h2>
            <FileUpload 
              file={file} 
              onFileChange={handleFileChange} 
              placeholder='Превуци фајл овде, или кликни да би га изабрао'
              fileType={FileType.Pdf}
            />
            <TextInput 
              value={title} 
              onChange={handleTitleChange} 
              type={"text"}
              placeholder='Унеси назив фајла'
            />
            <div onClick={handleUploadMaterial} style={{width: "100%"}}>
              <Button text='Додај'/>
            </div>
            {error && <h4 style={{color: "var(--primary-color)"}}>{error}</h4>}
          </div>
        )
      }
      
    </div>
  );
}

export default Materials;