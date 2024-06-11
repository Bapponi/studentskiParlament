import React, {useState} from 'react';
import './top-news.css'
import NewsClip from './NewsClip';

interface NewsClipProps {
  id: number;
  date: string;
  title: string;
  description: string;
}

function TopNews() {

const [news, setNews] = useState<NewsClipProps[]>([
    {
        id: 1,
        date: '26. 03. 2024.',
        title: 'Одлука о расписивању избора за школску 2024-2025',
        description: 'Одлука о Избору за Студентски парламент и студента продекана Електротехничког факултета у Београду и делегате у Студентском парламенту Универзитета у Београду за школску 2024-2025',
    },
    {
        id: 2,
        date: '15. 04. 2024.',
        title: 'Одлука о отказивању избора',
        description: 'Детаљи одлуке о отказивању избора са седнице одржане 13. априла 2024. године.',
    },
  ]);

  return (
    <div className='top-news'>
      <div className='top-news__title'>
        <h2>НАЈНОВИЈЕ ВЕСТИ</h2>
      </div>
      <div className='the-top__news'>
        {news.map((entry, index) => (
          <NewsClip 
            key={index}
            id={entry.id}
            date={entry.date}
            title={entry.title}
            description={entry.description}
          />
        ))}
      </div>
    </div>
  );
}

export default TopNews;