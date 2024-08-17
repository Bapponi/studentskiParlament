import React, { useEffect, useState } from 'react';
import SelectOption from '../form-elements/SelectOption';
import Button from '../button/Button';
import { usePoll } from '../../hooks/pollHooks/usePoll';
import MessageBox from '../message-box/MessageBox';
import { MessageBoxTypes } from './helpers';

interface PollOption {
  value: string;
  label: string;
}

interface PollVoteProps {
  pollId: number
  voteOptions: PollOption[];
  voted: boolean
  sendPollVote: ({
    pollId, 
    userId, 
    voteOption
  }:{
    pollId: number,
    userId: number,
    voteOption: string}
  )=>void,
  sendError: string | undefined,
  sendInfo: string | undefined,
  isLoadingSend: boolean;
}

const PollVote: React.FC<PollVoteProps> = ({
  pollId,
  voteOptions,
  voted,
  sendPollVote,
  sendError,
  sendInfo,
  isLoadingSend,
}) => {

  const [voteOption, setVoteOption] = useState<string>('')
  const userId = parseInt(localStorage.getItem('userId') || '-1');

  const handleVoteOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVoteOption(e.target.value);
  };

  const sendVote = async () =>{
    sendPollVote({pollId, userId, voteOption})
  }

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
      {sendInfo && <MessageBox text={sendInfo} infoType={MessageBoxTypes.Info}/>}
      {(sendError) && <MessageBox text={sendError} infoType={MessageBoxTypes.Error}/>}
      {isLoadingSend && <MessageBox text='Слање гласа у току...' infoType={MessageBoxTypes.Loading}/>} 
    </div>
  );
}

export default PollVote;
