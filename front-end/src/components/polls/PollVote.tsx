import React, { useEffect, useState } from 'react';
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
  const userId = parseInt(localStorage.getItem('userId') || '-1');
  const [voted, setVoted] = useState<boolean>(false)

  const handleVoteOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVoteOption(e.target.value);
  };

  const sendVote = async () =>{

    const payload = {
      pollId: pollId,
      userId: userId,
      voteOption: voteOption,
    }

    try{
      const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/poll/vote`, {
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
        console.error(error)
    }
  }

  const checkIsVoted = async () =>{

    try{
      const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/poll/${userId}/${pollId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Неуспешно хватање стања гласањеа!');
      }

      const data = await response.json();
      setVoted(data.voted)

    }catch(error){
        console.error(error)
    }
  }

  useEffect(()=>{
    checkIsVoted()
  },[])

  return (
    <div >
      {!voted ? (
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
      ):(
        <h3 style={{color: "var(--primary-color)"}}>
          Ваше гласање на овој анкети је забележено!
        </h3>
      )}  
    </div>
  );
}

export default PollVote;
