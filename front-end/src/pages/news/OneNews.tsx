import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import './news.css'
import Button from '../../components/button/Button';
import { useParams } from 'react-router-dom';

interface NewsSection{
  type: string,
  content: string,
}

interface NewsPanelProps{
  id: number,
  title: string,
  banner: string,
  clip: string,
  date: string,
  newsSection: NewsSection[],
}


// const OneNews: React.FC<NewsPanelProps> = () => {
function OneNews() {
  const { id } = useParams<{ id: string }>();
  const [newsDetails, setNewsDetails] = useState<NewsPanelProps | null>(null);
//   const [newsDetails, setNewsDetails] = useState<any>(null);


  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/news/${id}`, {method: 'GET'});
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNewsDetails(data);
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
          <Banner title={newsDetails.title} bannerImg={newsDetails.banner} />
          <div className='one-news'>
            <h3>Објављено: <span style={{color: "var(--primary-color)"}}>{newsDetails.date}</span></h3>
            <p>{newsDetails.clip}</p>
            {newsDetails.newsSection.map((entry, idx) => (
              <div key={idx} className='one-news__sections'>
                {entry.type === 'header' && <h2 className='news-section__header'>
                  {entry.content}
                </h2>}
                {entry.type === 'text' && (
                  <div>
                    {entry.content.split('\n').map((line, lineIdx) => (
                      <p key={lineIdx}>{line}</p>
                    ))}
                  </div>
                )}
                {entry.type === 'picture' && <img src={entry.content} alt={`News section ${idx}`} className='news-section__picture'/>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OneNews;