import React, { useEffect, useState } from 'react';
import './polls.css';
import PollVote from './PollVote';
import PollBar from './PollBar';
import { useAuth } from '../../AuthContext';
import ConformationDialog from '../conformation-dialog/ConformationDialog';
import { PollProps } from './helpers';

const Poll: React.FC<PollProps> = ({ 
  id, 
  title, 
  active, 
  membersVoted, 
  pollOptions, 
  voted,
  onDelete, 
  onUpdate, 
  sendPollVote, 
  isLoadingSend, 
  sendError, 
  sendInfo,
}) => {
  const [currentActive, setCurrentActive] = useState<boolean>(active);
  const [votesSum, setVotesSum] = useState<number>(0);
  const {isAdmin} = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const voteOptions = pollOptions.map(option => ({
    value: option.option_name,
    label: option.option_name
  }));

  useEffect(() => {
    const num: number = pollOptions.reduce((sum, option) => sum + option.votes_num, 0);
    setVotesSum(num);
  }, [pollOptions]);

  const updateActivity = async (updateActive: boolean) => {
    onUpdate({id, updateActive});
    setCurrentActive(!currentActive);
  };

  return (
    <div className='poll-container'>
      {isDialogOpen && (
        <ConformationDialog onConfirm={()=>{onDelete(id)}} onClose={()=>{setIsDialogOpen(false)}} />
      )}
      <h2 style={{color: "var(--primary-color)"}}>{title}</h2>
      <h3>Чланови који су гласали (укупно <span style={{color: "var(--primary-color)"}}>{votesSum}</span>):</h3>
      <div className='member-names'>
        {membersVoted && membersVoted.map((name, index) => (
          <span key={index}>
            {name}{index < membersVoted.length - 1 ? ', ' : ''}
          </span>
        ))}
      </div>
      {!currentActive && <PollBar pollOptions={pollOptions} />}
      {currentActive && 
        <PollVote 
          pollId={id} 
          voteOptions={voteOptions} 
          voted={voted}
          sendPollVote={sendPollVote}
          isLoadingSend={isLoadingSend}
          sendError={sendError}
          sendInfo={sendInfo}
        />}
      {isAdmin && (
        <div>
          <img src="bin.png" alt="bin" className='poll-admin poll-delete' onClick={()=>{setIsDialogOpen(true)}} />
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
