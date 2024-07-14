import React, { useEffect, useState } from 'react';
import './top-news.css';
import NewsClip from './NewsClip';

interface NewsClipProps {
  id: number;
  date: string;
  title: string;
  clip: string;
  banner: string;
}

function TopNews() {

  const [news, setNews] = useState<NewsClipProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const limit = 2;
  const offset = 0;

  const fetchNews = async () => {
    try {
      const response = await fetch(`http://localhost:8000/news?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setNews(data.news);
      
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
    <div className='top-news'>
      <div className='top-news__title'>
        <h2>НАЈНОВИЈЕ ВЕСТИ</h2>
      </div>
      <div className='the-top__news'>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          news.map((entry) => (
            <NewsClip 
              key={entry.id}
              id={entry.id}
              date={entry.date}
              title={entry.title}
              description={entry.clip}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TopNews;
