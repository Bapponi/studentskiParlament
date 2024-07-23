import React, { useState } from 'react';
import SelectOption from '../form-elements/SelectOption';
import Button from '../button/Button';

interface PollOption {
  value: string;
  label: string;
}

interface PollVoteProps {
  voteOptions: PollOption[];
}

const PollVote: React.FC<PollVoteProps> = ({
  voteOptions,
}) => {

  const [voteOption, setVoteOption] = useState<string>('')

  const handleVoteOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVoteOption(e.target.value);
  };

  const sendVote = async () =>{

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
