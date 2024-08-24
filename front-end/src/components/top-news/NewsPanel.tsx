import React, { useState } from 'react';
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
  
  return (
    <div className='news-panel'>
      {isDialogOpen && (
        <ConformationDialog onConfirm={()=>{onDelete(id)}} onClose={()=>{setIsDialogOpen(false)}} />
      )}
      <img src={banner} alt="news-panel__banner" className='news-panel__baner'/>
      <div className='news-panel__text'>
        <div>
          <div className='news-panel__title'>
            <div>
              <h3>{date}</h3>
              <h2 style={{color: "var(--primary-color)"}}>{title}</h2>
            </div>
            {isAdmin && 
              <img src="bin.png" alt="bin" className='news-delete' onClick={()=>{setIsDialogOpen(true)}}/>
            }
          </div>
          <p>{clip}</p>
        </div>
        <Link to={`/news/${id}`} className='news_panel__more'>
          <h3>Детаљније...</h3>
        </Link>
      </div>
    </div>
  );
}

export default NewsPanel;