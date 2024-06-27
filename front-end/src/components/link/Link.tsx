import React from 'react';
import './link.css'

interface LinkProps {
  id: number;
  logo: string;
  website: string;
  name: string;
  onDelete: (id: number) => void;
}
    
const LinkSite: React.FC<LinkProps> = ({ id, logo, website, name, onDelete}) => {
  
  const deleteLink = async () => {
    try {
      const response = await fetch(`http://localhost:8000/link/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Неуспешно избрисан линк!');
      }

      onDelete(id);
    } catch (error) {
      console.error('Грешка приликом брисанја линка:', error);
    }
  };

  const updatePopUp = () => {

  }
  
  return (
    <div className='link-container'>
      <a href={website} target='blank' className='link'>
        <img src={logo} alt="link-logo" className='link-logo'/>
        <h2>{name}</h2>
      </a>
      <img src="bin.png" alt="bin" className='link-admin link-delete' onClick={deleteLink} />
      <img src="upload.png" alt="upload" className='link-admin link-update' onClick={updatePopUp} />
    </div>
    
  );
}

export default LinkSite;