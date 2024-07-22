import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import './news.css'
import Button from '../../components/button/Button';
import { useParams } from 'react-router-dom';

interface NewsPanelProps {
  id: number;
  date: string;
  title: string;
  clip: string;
  banner: string;
}

// const OneNews: React.FC<NewsPanelProps> = () => {
function OneNews() {
  const { id } = useParams<{ id: string }>();
  const [newsDetails, setNewsDetails] = useState<NewsPanelProps | null>(null);
//   const [newsDetails, setNewsDetails] = useState<any>(null);


  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        // const response = await fetch(`http://localhost:8000/news/${id}`);
        const response = await fetch(`http://localhost:8000/news/${id}`, {method: 'GET'});
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setNewsDetails(data);
        console.log(newsDetails)
      } catch (error) {
        console.error('Error fetching news details:', error);
      }
    };

    fetchNewsDetails();
  }, [id]);

  return (
    <div>
      {newsDetails && (
        <div>
          <Banner title={newsDetails.title} bannerImg="ztf.png" />
          <h3>{newsDetails.date}</h3>
          <div className='one-news'>
            <p>{newsDetails.clip}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OneNews;