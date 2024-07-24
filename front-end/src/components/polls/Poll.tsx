import React, { useEffect, useState } from 'react';
import './polls.css';
import PollVote from './PollVote'; // Import the new PollVote component
import PollBar from './PollBar';
import { useAuth } from '../../AuthContext';

interface PollOption {
  option_name: string;
  votes_num: number;
}

interface PollProps {
  id: number;
  title: string;
  active: boolean;
  pollOptions: PollOption[];
  onDelete: (id: number) => void;
}

const Poll: React.FC<PollProps> = ({ id, title, active, pollOptions, onDelete }) => {
  const [currentActive, setCurrentActive] = useState<boolean>(active);
  const [votesSum, setVotesSum] = useState<number>(0);
  const {isAdmin} = useAuth();

  const voteOptions = pollOptions.map(option => ({
    value: option.option_name,
    label: option.option_name
  }));

  useEffect(() => {
    const num: number = pollOptions.reduce((sum, option) => sum + option.votes_num, 0);
    setVotesSum(num);
  }, [pollOptions]);

  const deletePoll = async () => {
    try {
      const response = await fetch(`http://localhost:8000/poll/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Неуспешно избрисано гласање!');
      }

      onDelete(id);
    } catch (error) {
      console.error('Грешка приликом брисанја гласања:', error);
    }
  };

  const updateActivity = async (updateActive: boolean) => {
    try {
      const payload = {
        active: updateActive
      };

      const response = await fetch(`http://localhost:8000/poll/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Неуспешно ажурирано гласање!');
      }
      setCurrentActive(!currentActive);
    } catch (error) {
      console.error('Грешка приликом брисанја гласања:', error);
    }
  };

  return (
    <div className='poll-container'>
      <h3>{title}</h3>
      <h3>Укупно гласова: <span style={{color: "var(--primary-color)"}}>{votesSum}</span></h3>
      {!currentActive && <PollBar pollOptions={pollOptions} />}
      {currentActive && <PollVote pollId={id} voteOptions={voteOptions}/>}
      {isAdmin && (
        <div>
          <img src="bin.png" alt="bin" className='poll-admin poll-delete' onClick={deletePoll} />
          <button className='poll-admin poll-toggle__active'>
            <div>
              {currentActive ? (
                <h3 onClick={() => { updateActivity(false) }}>Деактивирај</h3>) : (
                <h3 onClick={() => { updateActivity(true) }}>Активирај</h3>)
              }
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default Poll;
