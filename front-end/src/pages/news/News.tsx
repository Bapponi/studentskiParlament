import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import './news.css';
import NewsPanel from '../../components/top-news/NewsPanel';
import Button from '../../components/button/Button';
import { useNews } from '../../hooks/newsHooks/useNews';
import MessageBox from '../../components/message-box/MessageBox';
import { MessageBoxTypes, NewsProps } from './helpers';

function News() {
  const limit = 6;
  const [offset, setOffset] = useState<number>(0);
  const [localNews, setLocalNews] = useState<NewsProps[]>([]);
  const [deletedNewsIds, setDeletedNewsIds] = useState<Set<number>>(new Set());

  const { data, fetchError, isLoadingFetch, fetchNews,
          deleteNews, isLoadingDelete, deleteError, deleteInfo,
  } = useNews(limit, offset);
  const { news = [], totalCount = 0 } = data || {};

  useEffect(() => {
    const filteredNews = news.filter((item) => !deletedNewsIds.has(item.id));    
    setLocalNews(filteredNews);
    setOffset(filteredNews.length);
  }, [news, deletedNewsIds]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
    fetchNews();
  };

  const handleDelete = (id: number) => {
    setDeletedNewsIds((prevIds) => new Set(prevIds).add(id));
    deleteNews({newsToDeleteId: id});
  };

  return (
    <div>
      <Banner title='ВЕСТИ' bannerImg='ztf.png' />
      <div className='all-news'>
        {localNews.map((entry) => (
          <NewsPanel key={entry.id} {...entry} onDelete={handleDelete}/>
        ))}
        {totalCount && localNews.length < totalCount && (
          <div className='all-news__button' onClick={handleLoadMore}>
            <Button text='Учитај још вест' />
          </div>
        )}
      </div>
      {(deleteInfo) && 
        <MessageBox text={deleteInfo} infoType={MessageBoxTypes.Info}/>
      }
      {(fetchError || deleteError) && 
        <MessageBox text={fetchError || deleteError} infoType={MessageBoxTypes.Error}/>
      }
      {isLoadingFetch && <MessageBox text='Учитавају се вести...' infoType={MessageBoxTypes.Loading}/>}
      {isLoadingDelete && <MessageBox text='Брисање вести...' infoType={MessageBoxTypes.Loading}/>}
    </div>
  );
}

export default News;
