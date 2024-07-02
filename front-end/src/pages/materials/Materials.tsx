import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import './materials.css'
import Material from '../../components/material/Material';
import FileUpload from '../../components/form-elements/FileUpload';
import TextInput from '../../components/form-elements/TextInput';
import Button from '../../components/button/Button';

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

  const [materials, setMaterials] = useState<MaterialProps[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('http://localhost:8000/material');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: MaterialProps[] = await response.json();
        setMaterials(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const upload = async () => {

    if (!file) {
      setError("Молим Вас да унесете фајл")
      return;
    }
    setError(null)

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      const response = await fetch('http://localhost:8000/material/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setError(await response.text())
        throw new Error(await response.text());
      }else{
        const newMaterial: MaterialProps = await response.json();
        console.log(newMaterial)
        setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
        console.log(materials)
        setError(null)
        setFile(null)
        setTitle("")
      }
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDelete = (id: number) => {
    setMaterials((prevMaterials) => prevMaterials.filter(material => material.id !== id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error && isLoading) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Banner title='МАТЕРИЈАЛИ' bannerImg='ztf.png'/>
      <div className='materials'>
        {materials.map((entry) => (
          <Material key={entry.id} {...entry} onDelete={handleDelete} />
        ))}
      </div>
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
        <div onClick={upload} style={{width: "100%"}}>
          <Button text='Додај'/>
        </div>
        {error && <h4 style={{color: "var(--primary-color)"}}>{error}</h4>}
      </div>
    </div>
  );
}

export default Materials;