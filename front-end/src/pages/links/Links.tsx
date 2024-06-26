import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import Link from '../../components/link/Link';
import './links.css';

interface LinkProps {
  logo: string;
  website: string;
  name: string;
}

const Links: React.FC = () => {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      <Banner title='ЛИНКОВИ' bannerImg='ztf.png'/>
      <div className='links'>
        {links.map((entry, index) => (
          <Link key={index} logo={entry.logo} website={entry.website} name={entry.name} />
        ))}
      </div>
    </div>
  );
}

export default Links;
