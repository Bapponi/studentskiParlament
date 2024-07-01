import React from 'react';
import './material.css'

interface MaterialProps {
  id: number;
  documentLink: string;
  title: string;
  onDelete: (id: number) => void;
}
    
  const Material: React.FC<MaterialProps> = ({ title, documentLink, onDelete}) => {
  return (
    <a href={documentLink} target='blank' className='material'>
      <img src="document.png" alt="document" className='document-image'/>
      <h2>{title}</h2>
    </a>
  );
}

export default Material;