import React from 'react';
import './link.css'

interface LinkProps {
  logo: string;
  website: string;
  name: string;
}
    
  const LinkSite: React.FC<LinkProps> = ({ logo, website, name}) => {
  return (
    <a href={website} target='blank' className='link'>
      <img src={logo} alt="link-logo" className='link-logo'/>
      <h2>{name}</h2>
    </a>
  );
}

export default LinkSite;