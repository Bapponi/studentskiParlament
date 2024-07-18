import React, { useEffect, useState } from 'react';
import './polls.css';

interface PollsProps{
  id: number
  title: string
}

function Polls() {

  const [polls, setPolls] = useState<PollsProps[]>([])

  useEffect(()=>{
    const fetchPolls = async () => {
      try{
        const response = await fetch('http://localhost:8000/poll');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: PollsProps[] = await response.json();
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
      <div>
        {polls.map((entry) => (
          <div key={entry.id}>{entry.id} - {entry.title}</div>
        ))}
      </div>
    </div>
  );
}

export default Polls;
