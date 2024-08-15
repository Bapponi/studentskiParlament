import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import './news.css';
import NewsPanel from '../../components/top-news/NewsPanel';
import Button from '../../components/button/Button';
import { useNews } from '../../hooks/newsHooks/useNews';
import { useFetchNews } from '../../hooks/newsHooks/useFetchNews';

// interface NewsPanelProps {
//   id: number;
//   date: string;
//   title: string;
//   clip: string;
//   banner: string;
// }

function News() {
  const limit = 6;
  const [offset, setOffset] = useState<number>(0);
  
  const { data, fetchError, isLoadingFetch, fetchNews } = useNews(limit, offset);
  const { news = [], totalCount = 0 } = data || {};

  useEffect(() => {
    setOffset(news.length);
  }, [news]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
    fetchNews();
  };
  // const {news, totalCount, fetchNews} = useNews();
  // const [news, setNews] = useState<NewsPanelProps[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  // const [totalCount, setTotalCount] = useState<number>(0); // State to track total count of news

  // const fetchNews = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/news?limit=${limit}&offset=${news.length}`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     const data: NewsResponse = await response.json();
  //     const newPanels: NewsPanelProps[] = news.concat(data.news);
  //     setNews(newPanels);
  //     setTotalCount(data.totalCount); // Set total count of news
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       setError(error.message);
  //     } else {
  //       setError('An unknown error occurred');
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchNews();
  // }, []);

  const handleDelete = (id: number) => {
    // setNews((prevNews) => prevNews.filter(news => news.id !== id));
  };

  return (
    <div>
      <Banner title='ВЕСТИ' bannerImg='ztf.png' />
      <div className='all-news'>
        {news && news.map((entry) => (
          <NewsPanel key={entry.id} {...entry} onDelete={handleDelete}/>
        ))}
        {news && totalCount && news.length < totalCount && ( // Check if more news are available
          <div className='all-news__button' onClick={handleLoadMore}>
            <Button text='Учитај још вест' />
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
