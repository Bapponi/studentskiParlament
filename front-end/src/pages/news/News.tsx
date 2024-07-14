import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import './news.css';
import NewsPanel from '../../components/top-news/NewsPanel';
import Button from '../../components/button/Button';

interface NewsPanelProps {
  id: number;
  date: string;
  title: string;
  clip: string;
  banner: string;
}

interface NewsResponse {
  news: NewsPanelProps[];
  totalCount: number;
}

function News() {
  const [news, setNews] = useState<NewsPanelProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0); // State to track total count of news

  const fetchNews = async () => {
    try {
      console.log(news.length);
      const response = await fetch(`http://localhost:8000/news?limit=${2}&offset=${news.length}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: NewsResponse = await response.json();
      const newPanels: NewsPanelProps[] = news.concat(data.news);
      setNews(newPanels);
      setTotalCount(data.totalCount); // Set total count of news
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
      <Banner title='ВЕСТИ' bannerImg='ztf.png' />
      <div className='all-news'>
        {news.map((entry) => (
          <NewsPanel key={entry.id} {...entry} />
        ))}
        {news.length < totalCount && ( // Check if more news are available
          <div className='all-news__button' onClick={fetchNews}>
            <Button text='Учитај још вест' />
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
