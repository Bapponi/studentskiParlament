import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import Link from '../../components/link/Link';
import PhotoUpload from '../../components/form-elements/PhotoUpload';
import Button from '../../components/button/Button'; // Assuming you have a Button component
import './links.css';
import TextInput from '../../components/form-elements/TextInput';

enum FileType {
  Photo = 1,
  Video,
  Pdf
}

interface LinkProps {
  id: number;
  logo: string;
  website: string;
  name: string;
  onDelete: (id: number) => void;
}

const Links: React.FC = () => {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [website, setWebsite] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('http://localhost:8000/link');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: LinkProps[] = await response.json();
        setLinks(data);
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

    fetchLinks();
  }, []);

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const upload = async () => {
    if (!file) {
      setError("Молим Вас да унесете лого")
      return;
    }
    setError(null)

    const formData = new FormData();
    formData.append('file', file);
    formData.append('website', website);
    formData.append('name', name);

    try {
      const response = await fetch('http://localhost:8000/link/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setError(await response.text())
        throw new Error(await response.text());
      }else{
        const newLink: LinkProps = await response.json();
        setLinks((prevLinks) => [...prevLinks, newLink]);
        setError(null)
        setFile(null)
        setName("")
        setWebsite("")
      }
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDelete = (id: number) => {
    setLinks((prevLinks) => prevLinks.filter(link => link.id !== id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error && isLoading) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Banner title='ЛИНКОВИ' bannerImg='ztf.png'/>
      <div className='links'>
        {links.map((entry) => (
          <Link key={entry.id} {...entry} onDelete={handleDelete} />
        ))}
      </div>
      <div className='create-link'>
        <h2>Креирај нови линк</h2>
        <PhotoUpload 
          file={file} 
          onFileChange={handleFileChange} 
          placeholder='Превуци лого овде, или кликни да би га изабрао'
          fileType={FileType.Photo}
        />
        {/* <input type="file" onChange={handleFileChange} /> */}
        <TextInput 
          value={website} 
          onChange={handleWebsiteChange} 
          type={"text"} 
          placeholder='Унеси линк овде типа https://...'
        />
        <TextInput 
          value={name} 
          onChange={handleNameChange} 
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

export default Links;