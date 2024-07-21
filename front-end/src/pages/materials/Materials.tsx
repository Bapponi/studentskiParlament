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

  const {materials, isLoadingFetch, fetchError,
         createMaterial, isLoadingCreate, createError, 
         deleteMaterial, isLoadingDelete, deleteError} = useMaterials();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const {isLoggedIn} = useAuth();

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  function handleUploadMaterial(){
      createMaterial({file:file, title:title});
      setTitle('');
      setFile(null)
  }

  const handleDelete = (id: number) => {
    console.log('del iz componente')
    deleteMaterial({materialToDeleteId: id});
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
        {materials && materials.map((entry) => (
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
            {deleteError && <h4 style={{color: "var(--primary-color)"}}>{deleteError}</h4>}
            {fetchError && <h4 style={{color: "var(--primary-color)"}}>{fetchError}</h4>}
            {createError && <h4 style={{color: "var(--primary-color)"}}>{createError}</h4>}
            {isLoadingFetch && <h4 style={{color: "var(--primary-color)"}}>a</h4>}
            {isLoadingCreate && <h4 style={{color: "var(--primary-color)"}}>b</h4>}
            {isLoadingDelete && <h4 style={{color: "var(--primary-color)"}}>c</h4>}
            
          </div>
        )
      }
      
    </div>
  );
}

export default Materials;