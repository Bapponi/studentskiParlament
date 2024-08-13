import React, { useEffect, useState } from 'react';
import './polls.css';
import Poll from './Poll';

interface PollOption{
  option_name: string
  votes_num: number
}

interface PollProps{
  id: number
  title: string
  active: boolean
  pollOptions: PollOption[]
}

function Polls() {

  const [polls, setPolls] = useState<PollProps[]>([])

  useEffect(()=>{
    const fetchPolls = async () => {
      try{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/poll`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: PollProps[] = await response.json();
        setPolls(data);
      }catch(error){
        console.error(error);
      }
    }
    fetchPolls();
  },[])

  const handleDelete = (id: number) => {
    setPolls((prevPolls) => prevPolls.filter(poll => poll.id !== id));
  };

  return (
    <div className='polls-container'>
      <h1 style={{color: "var(--primary-color)"}}>Све активне анкете</h1>
      <div className='polls-content'>
        {polls.map((entry) => (
          <Poll key={entry.id} {...entry} onDelete={handleDelete}/>
        ))}
      </div>
    </div>
    
  );
}

export default Polls;
