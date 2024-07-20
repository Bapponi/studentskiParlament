import React, { useEffect, useState } from 'react';
import './polls.css';

interface PollOption{
  option_name: string,
  votes_num: number,
}
  
interface PollProps{
  id: number,
  title: string,
  pollOptions: PollOption[],
}

const Poll: React.FC<PollProps> = ({ id, title, pollOptions}) =>{


  return (
    <div className='poll-container'>
      {id} - {title}
      <div>
        {pollOptions.map((entry, index)=>(
            <div key={index}>
                <span>{entry.option_name}</span> - {entry.votes_num}
            </div>
        ))}
      </div>
    </div>
  );
}

export default Poll;
