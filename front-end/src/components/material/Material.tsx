import React from 'react';
import './material.css'

interface MaterialProps {
  documentLink: string;
  title: string;
}
    
  const Material: React.FC<MaterialProps> = ({ title, documentLink}) => {
  return (
    <a href={documentLink} target='blank' className='material'>
      <img src="document.png" alt="document" className='document-image'/>
      <h2>{title}</h2>
    </a>
  );
}

export default Material;