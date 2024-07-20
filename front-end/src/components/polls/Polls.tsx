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
  pollOptions: PollOption[]
}

function Polls() {

  const [polls, setPolls] = useState<PollProps[]>([])

  useEffect(()=>{
    const fetchPolls = async () => {
      try{
        const response = await fetch('http://localhost:8000/poll');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: PollProps[] = await response.json();
        console.log(data)
        setPolls(data);
      }catch(error){
        console.error(error);
      }
    }
    fetchPolls();
  },[])

  return (
    <div className='polls-container'>
      <h1 style={{color: "var(--primary-color)"}}>Све активне анкете</h1>
      <div className='polls-content'>
        {polls.map((entry) => (
          <Poll key={entry.id} {...entry}/>
        ))}
      </div>
    </div>
    
  );
}

export default Polls;
