import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import Link from '../../components/link/Link';
import PhotoUpload from '../../components/form-elements/PhotoUpload';
import Button from '../../components/button/Button'; // Assuming you have a Button component
import './links.css';
import TextInput from '../../components/form-elements/TextInput';

interface LinkProps {
  logo: string;
  website: string;
  name: string;
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
      alert('Please select a file');
      return;
    }

    console.log(file)

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
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Banner title='ЛИНКОВИ' bannerImg='ztf.png'/>
      <div className='links'>
        {links.map((entry, index) => (
          <Link key={index} logo={entry.logo} website={entry.website} name={entry.name} />
        ))}
      </div>
      <div className='create-link'>
        <PhotoUpload file={file} onFileChange={handleFileChange} />
        {/* <input type="file" onChange={handleFileChange} /> */}
        <TextInput value={website} onChange={handleWebsiteChange} type={"text"}/>
        <TextInput value={name} onChange={handleNameChange} type={"text"}/>
        <div onClick={upload} style={{width: "100%"}}>
          <Button text='Upload'/>
        </div>
      </div>
    </div>
  );
}

export default Links;