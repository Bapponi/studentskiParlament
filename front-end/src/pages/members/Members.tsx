import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import Member from '../../components/member/Member';
import './members.css';
import FileUpload from '../../components/form-elements/FileUpload';
import TextInput from '../../components/form-elements/TextInput';
import Button from '../../components/button/Button';
import TextArea from '../../components/form-elements/TextArea';
import { useAuth } from '../../AuthContext';
import SelectOption from '../../components/form-elements/SelectOption';

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
  memberImg: string;
  roleId: number;
  onDelete: (id: number) => void;
}

const Members: React.FC = () => {
  const [members, setMembers] = useState<MemberProps[]>([]);
  const [adminMembers, setAdminMembers] = useState<MemberProps[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [roleId, setRoleId] = useState<string>('');
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`http://localhost:8000/member/3`);
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

    const fetchAdminMembers = async () => {
      try {
        const response = await fetch(`http://localhost:8000/member/1`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: MemberProps[] = await response.json();
        setAdminMembers(data);
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

    fetchAdminMembers();
    fetchMembers();
  }, []);

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleRoleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleId(e.target.value);
  };

  const upload = async () => {
    if (!file && parseInt(roleId) == 1) {
      setError("Молим Вас да унесете лого")
      return;
    }
    setError(null)

    const formData = new FormData();
    if (file && parseInt(roleId) == 1) {
      formData.append('file', file);
    }
    formData.append('name', name);
    formData.append('position', position);
    formData.append('bio', bio);
    formData.append('roleId', roleId);

    try {
      const response = await fetch('http://localhost:8000/member/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setError(await response.text())
        throw new Error(await response.text());
      } else {
        const newMember: MemberProps = await response.json();
        if (parseInt(roleId) == 1) {
          setAdminMembers((prevMembers) => [...prevMembers, newMember]);
        } else if (parseInt(roleId) == 3) {
          setMembers((prevMembers) => [...prevMembers, newMember]);
        } else {
          throw new Error('Унесена лоша рола');
        }

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

  const handleDelete = (id: number) => {
    setMembers((prevMembers) => prevMembers.filter(member => member.id !== id));
    setAdminMembers((prevMembers) => prevMembers.filter(member => member.id !== id));
  };

  const chunkSize = 6;
  const chunks = [];

  for (let i = 0; i < members.length; i += chunkSize) {
    chunks.push(members.slice(i, i + chunkSize));
  }

  const positionOptions = [
    { value: 'председник', label: 'Председник' },
    { value: 'под-председник', label: 'Под-Председник' },
    { value: 'члан', label: 'Члан' },
  ];
  
  const roleOptions = [
    { value: '1', label: 'Админ' },
    { value: '2', label: 'ПР' },
    { value: '3', label: 'Корисник' },
  ];

  return (
    <div>
      <Banner title='ЧЛАНОВИ' bannerImg='ztf.png' />
      <div className='all-members'>
        <div className='main-members'>
          {adminMembers.map((entry) => (
            <Member key={entry.id} {...entry} onDelete={handleDelete} />
          ))}
        </div>
        <div className='other-members'>
          {chunks.map((chunk, index) => (
            <div key={index} className='other-members__column'>
              {chunk.map((entry, idx) => (
                <Member key={idx} {...entry} onDelete={handleDelete} />
              ))}
            </div>
          ))}
        </div>
      </div>
      {
        isLoggedIn && (
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
            <SelectOption
              value={position}
              onChange={handlePositionChange}
              options={positionOptions}
              placeholder='Унеси позицију члана'
            />
            <TextArea
              value={bio}
              onChange={handleBioChange}
              placeholder='Унеси биографију члана'
            />
            <SelectOption
              value={roleId}
              onChange={handleRoleIdChange}
              options={roleOptions}
              placeholder='Унеси ролу члана'
            />
            <div onClick={upload} style={{ width: "100%" }}>
              <Button text='Додај' />
            </div>
            {error && <h4 style={{ color: "var(--primary-color)" }}>{error}</h4>}
          </div>
        )
      }
    </div>
  );
}

export default Members;
