import React, { useState } from 'react';
import './polls.css';

interface PollsProps{
  id: number
  title: string
}

function Polls() {

  const [polls, setPolls] = useState<PollsProps[]>([])

  return (
    <div className='polls-container'>
      <h1 style={{color: "var(--primary-color)"}}>Све активне анкете</h1>
      <div>

      </div>
    </div>
  );
}

export default Polls;
