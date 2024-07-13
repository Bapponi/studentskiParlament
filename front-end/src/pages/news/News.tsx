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
  const [onLimit, setOnLimit] = useState<boolean>(true);

  const fetchNewsCount = async () => {
    try {
      const response = await fetch('http://localhost:8000/news/count');
      if (!response.ok) {
        throw new Error('Failed to fetch news count');
      }
      const data = await response.json();
      console.log(data.count); // Log the count of news items
      return data.count
    } catch (error) {
      console.error('Error fetching news count:', error);
    }
  };

  const fetchNews = async () => {
    try {
      console.log(news.length)
      const response = await fetch(`http://localhost:8000/news?limit=${6}&offset=${news.length}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: NewsPanelProps[] = await response.json();
      const newPanels: NewsPanelProps[] = news.concat(data) 
      setNews(newPanels);

      const count = await fetchNewsCount()
      setOnLimit(count === news.length);
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

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <Banner title='ВЕСТИ' bannerImg='ztf.png'/>
      <div className='all-news'>
      {news.map((entry) => (
          <NewsPanel key={entry.id} {...entry}/>
        ))}
        {
          !onLimit && (
            <div className='all-news__button' onClick={fetchNews}>
              <Button text='Учитај још вест'/>
            </div>
          )
        }
      </div>
      
    </div>
  );
}

export default News;