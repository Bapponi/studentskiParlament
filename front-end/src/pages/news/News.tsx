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

  const news1: NewsPanelProps[] = [
    {
      id: 1,
      date: '26. 03. 2024.',
      title: 'Одлука о расписивању избора за школску 2024-2025',
      clip: 'Одлука о Избору за Студентски парламент и студента продекана Електротехничког факултета у Београду и делегате у Студентском парламенту Универзитета у Београду за школску 2024-2025',
      banner: 'ztf.png'
    },
    {
      id: 2,
      date: '15. 04. 2024.',
      title: 'Одлука о отказивању избора',
      clip: 'Детаљи одлуке о отказивању избора са седнице одржане 13. априла 2024. године.',
      banner: 'ztf.png'
    },
    {
      id: 3,
      date: '26. 03. 2024.',
      title: 'Одлука о расписивању избора за школску 2024-2025',
      clip: 'Одлука о Избору за Студентски парламент и студента продекана Електротехничког факултета у Београду и делегате у Студентском парламенту Универзитета у Београду за школску 2024-2025',
      banner: 'ztf.png'
    },
    {
      id: 4,
      date: '15. 04. 2024.',
      title: 'Одлука о отказивању избора',
      clip: 'Детаљи одлуке о отказивању избора са седнице одржане 13. априла 2024. године.',
      banner: 'ztf.png'
    },
    {
      id: 5,
      date: '26. 03. 2024.',
      title: 'Одлука о расписивању избора за школску 2024-2025',
      clip: 'Одлука о Избору за Студентски парламент и студента продекана Електротехничког факултета у Београду и делегате у Студентском парламенту Универзитета у Београду за школску 2024-2025',
      banner: 'ztf.png'
    },
    {
      id: 6,
      date: '15. 04. 2024.',
      title: 'Одлука о отказивању избора',
      clip: 'Детаљи одлуке о отказивању избора са седнице одржане 13. априла 2024. године.',
      banner: 'ztf.png'
    }
  ];

  const [news, setNews] = useState<NewsPanelProps[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:8000/news');
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
      {news.map((entry, index) => (
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