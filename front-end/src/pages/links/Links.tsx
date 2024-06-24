import React from 'react';
import Banner from '../../components/banner/Banner';
import './links.css';
import LinkSite from '../../components/link/Link';

interface LinkProps {
  logo: string;
  website: string;
  name: string;
}

const links: LinkProps[] = [
  {
    logo: './logos/etf-logo__old.png',
    website: 'https://www.etf.bg.ac.rs/',
    name: 'Електротехнички факултет'
  },
  {
    logo: './logos/eestec-logo.png',
    website: 'http://eestec.etf.rs/',
    name: 'ИСТЕК Београд'
  },
  {
    logo: './logos/best-logo.png',
    website: 'https://www.etf.bg.ac.rs/',
    name: 'BEST Beograd'
  },
  {
    logo: './logos/elektron-logo.png',
    website: 'https://elektron.org.rs/',
    name: 'Електрон'
  },
  {
    logo: './logos/ieee-logo.png',
    website: 'https://www.ieee.org/',
    name: 'IEEE'
  }
];

function Links() {
  return (
    <div>
      <Banner title='ЛИНКОВИ' bannerImg='ztf.png' />
      <div className='links'>
        {links.map((entry, index) => (
          <LinkSite
            key={index}
            logo={entry.logo}
            website={entry.website}
            name={entry.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Links;
