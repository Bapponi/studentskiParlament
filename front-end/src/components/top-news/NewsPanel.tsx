import React, { useState } from 'react';
import Banner from '../../components/banner/Banner';
import './top-news.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import ConformationDialog from '../conformation-dialog/ConformationDialog';

interface NewsPanelProps {
  id: number;
  date: string;
  title: string;
  clip: string;
  banner: string;
  onDelete: (id: number) => void;
}

const NewsPanel: React.FC<NewsPanelProps> = ({ id, date, title, clip, banner, onDelete}) => {
  
  const {isAdmin} = useAuth()
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deleteNews = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/news/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Неуспешно избрисана вест!');
      }

      onDelete(id);
    } catch (error) {
      console.error('Грешка приликом брисанја вести:', error);
    }
  };
  
  return (
    <div className='news-panel'>
      {isDialogOpen && (
        <ConformationDialog onConfirm={deleteNews} onClose={()=>{setIsDialogOpen(false)}} />
      )}
      {isAdmin && 
        <img src="bin.png" alt="bin" className='news-delete' onClick={()=>{setIsDialogOpen(true)}}/>
      }
      <img src={banner} alt="news-panel__banner" className='news-panel__baner'/>
      <div className='news-panel__text'>
        <div>
          <h3>{date}</h3>
          <div className='news-panel__title'>
            <h2>{title}</h2>
          </div>
          <p>{clip}</p>
        </div>
        <Link to={`/news/${id}`} className='news_panel__more'>
          <h3>Detaljnije...</h3>
        </Link>
      </div>
    </div>
  );
}

export default NewsPanel;