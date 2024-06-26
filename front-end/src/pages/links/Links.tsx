import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import Link from '../../components/link/Link';
import './links.css';
import Button from '../../components/button/Button';
import { upload } from '@testing-library/user-event/dist/upload';
import PhotoUpload from '../../components/form-elements/PhotoUpload';
import TextInput from '../../components/form-elements/TextInput';

interface LinkProps {
  logo: string;
  website: string;
  name: string;
}

const Links: React.FC = () => {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const upload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('website', website);
    formData.append('name', name);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const newLink: LinkProps = await response.json();
      setLinks([...links, newLink]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <Banner title='ЛИНКОВИ' bannerImg='ztf.png'/>
      <div className='links'>
        {links.map((entry, index) => (
          <Link key={index} logo={entry.logo} website={entry.website} name={entry.name} />
        ))}
      </div>
      <div className='create-link'>
        {/* <PhotoUpload file={file} onFileChange={handleFileChange}/> */}
        <input type="file" onChange={handleFileChange} />
        <TextInput value={website} onChange={handleWebsiteChange} type={"text"}/>
        <TextInput value={name} onChange={handleNameChange} type={"text"}/>
        <div onClick={upload}>
          <Button text='Upload'/>
        </div>
      </div>
      
    </div>
  );
}

export default Links;


