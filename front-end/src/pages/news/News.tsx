import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import './news.css'
import NewsPanel from '../../components/top-news/NewsPanel';
import Button from '../../components/button/Button';

interface NewsPanelProps {
  id: number;
  date: string;
  title: string;
  clip: string;
  banner: string;
}

function News() {

  const [news, setNews] = useState<NewsPanelProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`http://localhost:8000/news?limit=${6}&offset=${0}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: NewsPanelProps[] = await response.json();
        setNews(data);
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

    fetchNews();
  }, []);

  const getMoreNews = () => {
    console.log("Hvata")
  }

  return (
    <div>
      <Banner title='ВЕСТИ' bannerImg='ztf.png'/>
      <div className='all-news'>
      {news.map((entry) => (
          <NewsPanel key={entry.id} {...entry}/>
        ))}
        <div className='all-news__button' onClick={getMoreNews}>
          <Button text='Учитај још вест'/>
        </div>
      </div>
      
    </div>
  );
}

export default News;