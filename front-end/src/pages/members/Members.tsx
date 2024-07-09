import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import Member from '../../components/member/Member';
import './members.css';
import FileUpload from '../../components/form-elements/FileUpload';
import TextInput from '../../components/form-elements/TextInput';
import Button from '../../components/button/Button';
import TextArea from '../../components/form-elements/TextArea';

enum FileType {
  Photo = 1,
  Video,
  Pdf
}

interface MemberProps {
  id: number;
  name: string;
  position: string;
  bio: string;
  roleId: number;
  onDelete: (id: number) => void;
}

function Members() {

  const [members, setMembers] = useState<MemberProps[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [roleId, setRoleId] = useState<string>('');

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('http://localhost:8000/member');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: MemberProps[] = await response.json();
        setMembers(data);
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

  const members1: string[] = [
    'Име Презиме1',
    'Име Презиме2',
    'Име Презиме3',
    'Име Презиме4',
    'Име Презиме5',
    'Име Презиме6',
    'Име Презиме7',
    'Име Презиме8',
    'Име Презиме9',
    'Име Презиме10',
    'Име Презиме11',
    'Име Презиме12',
    'Име Презиме13',
    'Име Презиме14',
    'Име Презиме15',
    'Име Презиме16',
    'Име Презиме17',
    'Име Презиме18',
  ]

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleRoleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleId(e.target.value);
  };

  const upload = async () => {
    if (!file) {
      setError("Молим Вас да унесете лого")
      return;
    }
    setError(null)

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('position', position);
    formData.append('bio', bio);
    formData.append('roleId', roleId);

    try {
      const response = await fetch('http://localhost:8000/link/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setError(await response.text())
        throw new Error(await response.text());
      }else{
        const newLink: MemberProps = await response.json();
        // setMembers((prevLinks) => [...prevLinks, newLink]);
        setError(null)
        setFile(null)
        setName("")
        setPosition("")
        setBio("")
        setRoleId("")
      }
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // const handleDelete = (id: number) => {
  //   setLinks((prevLinks) => prevLinks.filter(link => link.id !== id));
  // };

  const chunkSize = 6;
  const chunks = [];

  for (let i = 0; i < members1.length; i += chunkSize) {
    chunks.push(members1.slice(i, i + chunkSize));
  }

  return (
    <div>
      <Banner title='ЧЛАНОВИ' bannerImg='ztf.png'/>
      <div className='all-members'>
        <div className='main-members'>
          <Member 
            position='председник' 
            name='Име Презиме' 
            bio='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas eos labore fugiat eaque facere ipsam provident! Quis distinctio expedita esse fugiat adipisci non, quas, voluptas debitis blanditiis amet asperiores? Deleniti commodi quidem suscipit asperiores qui vero ratione sed impedit animi?'
            memberImg='person.png'
          />
          <Member 
            position='под-председник' 
            name='Име Презиме' 
            bio='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas eos labore fugiat eaque facere ipsam provident! Quis distinctio expedita esse fugiat adipisci non, quas, voluptas debitis blanditiis amet asperiores? Deleniti commodi quidem suscipit asperiores qui vero ratione sed impedit animi?'
            memberImg='person.png'
          />
        </div>
        <div className='other-members'>
          {chunks.map((chunk, index) => (
            <div key={index} className='other-members__column'>
              {chunk.map((member, idx) => (
                <h2 key={idx} className='other-member'>
                  <center>
                    <span style={{color: "var(--primary-color)"}}>
                      {member}
                    </span> - члан
                  </center>
                </h2>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className='create-member'>
        <h2>Креирај новог члана</h2>
        <FileUpload 
          file={file} 
          onFileChange={handleFileChange} 
          placeholder='Превуци слику члана овде, или кликни да би је изабрао'
          fileType={FileType.Photo}
        />
        <TextInput 
          value={name} 
          onChange={handleNameChange} 
          type={"text"}
          placeholder='Унеси име и презиме члана'
        />
        <TextInput 
          value={position} 
          onChange={handlePositionChange} 
          type={"text"} 
          placeholder='Унеси позицију члана'
        />
        <TextArea 
          value={bio} 
          onChange={handleBioChange}
          placeholder='Унеси биографију члана'
        />
        <TextInput 
          value={roleId} 
          onChange={handleRoleIdChange} 
          type={"text"}
          placeholder='Унеси ролу члана'
        />
        <div onClick={upload} style={{width: "100%"}}>
          <Button text='Додај'/>
        </div>
        {error && <h4 style={{color: "var(--primary-color)"}}>{error}</h4>}
      </div>
    </div>
  );
}

export default Members;