import React, { useState } from 'react';
import SelectOption from '../form-elements/SelectOption';
import Button from '../button/Button';

interface PollOption {
  value: string;
  label: string;
}

interface PollVoteProps {
  pollId: number
  voteOptions: PollOption[];
}

const PollVote: React.FC<PollVoteProps> = ({
  pollId,
  voteOptions,
}) => {

  const [voteOption, setVoteOption] = useState<string>('')

  const handleVoteOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVoteOption(e.target.value);
  };

  const sendVote = async () =>{

    const userId = parseInt(localStorage.getItem('userId') || '-1');

    const payload = {
      pollId: pollId,
      userId: userId,
      voteOption: voteOption,
    }

    try{
      const response = await fetch('http://localhost:8000/poll/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Неуспешно гласање!');
      }

    }catch(error){

    }
  }

  return (
    <div className='poll-vote'>
      <SelectOption
        value={voteOption}
        onChange={handleVoteOptionChange}
        options={voteOptions} 
        placeholder='Гласај за једну од опција'
      />
      <div style={{width: "100%"}} onClick={sendVote}>
        <Button text='Пошаљи глас'/>
      </div>
    </div>
  );
}

export default PollVote;
