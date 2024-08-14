import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import './materials.css'
import Material from '../../components/material/Material';
import FileUpload from '../../components/form-elements/FileUpload';
import TextInput from '../../components/form-elements/TextInput';
import Button from '../../components/button/Button';
import { useMaterials } from '../../hooks/materialHooks/useMaterials';
import { useAuth } from '../../AuthContext';
import MessageBox from '../../components/message-box/MessageBox';
import { FileType, MessageBoxTypes } from './helpers';

function Materials() {

  const {materials, isLoadingFetch, fetchError,
         createMaterial, isLoadingCreate, createError, createInfo, 
         deleteMaterial, isLoadingDelete, deleteError, deleteInfo,
         updateMaterial, isLoadingUpdate, updateError, updateInfo
        } = useMaterials();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const {isAdmin} = useAuth();

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  function handleCreateMaterial(){
    createMaterial({file:file, title:title});
    setTitle('');
    setFile(null)
  }

  const handleDelete = (id: number) => {
    deleteMaterial({materialToDeleteId: id});
  };

  return (
    <div>
      <Banner title='МАТЕРИЈАЛИ' bannerImg='ztf.png'/>
      <div className='materials'>
        {materials && materials.map((entry) => (
          <Material key={entry.id} {...entry} onDelete={handleDelete} onUpdate={updateMaterial}/>
        ))}
      </div>
      { isAdmin && (
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
            <div onClick={handleCreateMaterial} style={{width: "100%"}}>
              <Button text='Додај'/>
            </div>
            {(deleteError || fetchError || createError || updateError) && 
              <MessageBox text={deleteError || fetchError || createError || updateError} infoType={MessageBoxTypes.Error}/>
            }
            {(deleteInfo || createInfo || updateInfo) && 
              <MessageBox text={deleteInfo || createInfo || updateInfo} infoType={MessageBoxTypes.Info}/>
            }
            {isLoadingFetch && <MessageBox text='Учитавају се сви материјали...' infoType={MessageBoxTypes.Loading}/>}
            {isLoadingCreate && <MessageBox text='Креирање новог материјала...' infoType={MessageBoxTypes.Loading}/>}
            {isLoadingDelete && <MessageBox text='Брисање материјала...' infoType={MessageBoxTypes.Loading}/>}
            {isLoadingUpdate && <MessageBox text='Ажурирање материјала...' infoType={MessageBoxTypes.Loading}/>}
          </div>
        )
      }
      
    </div>
  );
}

export default Materials;