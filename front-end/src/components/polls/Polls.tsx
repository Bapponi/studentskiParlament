import React, { useEffect, useState } from 'react';
import './polls.css';
import Poll from './Poll';
import { usePoll } from '../../hooks/pollHooks/usePoll';
import { MessageBoxTypes } from './helpers';
import MessageBox from '../message-box/MessageBox';

function Polls() {

  const userId = localStorage.getItem('userId')
  const {polls, fetchError, isLoadingFetch,
         deletePoll, isLoadingDelete, deleteError, deleteInfo,
         updatePollActivity, updateActivityError, isLoadingUpdateActivity, updateActivityInfo,
         sendPollVote, isLoadingSend, sendError, sendInfo,
  } = usePoll(userId ? parseInt(userId) : -1);

  const handleDelete = (id: number) => {
    deletePoll({pollToDeleteId :id})
  };

  return (
    <div className='polls-container'>
      <h1 style={{color: "var(--primary-color)"}}>Све активне анкете</h1>
      <div className='polls-content'>
        {polls && polls.map((entry) => (
          <Poll 
            key={entry.id} {...entry} 
            onDelete={handleDelete} 
            onUpdate={updatePollActivity}
            sendPollVote={sendPollVote}
            isLoadingSend={isLoadingSend}
            sendError={sendError}
            sendInfo={sendInfo}
          />
        ))}
      </div>
      {(deleteError || fetchError || updateActivityError || sendError) && 
        <MessageBox text={deleteError || fetchError || updateActivityError || sendError} infoType={MessageBoxTypes.Error}/>
      }
      {(deleteInfo || updateActivityInfo || sendInfo) && 
        <MessageBox text={deleteInfo || updateActivityInfo || sendInfo} infoType={MessageBoxTypes.Info}/>
      }
      {isLoadingFetch && <MessageBox text='Учитавају се сва гласања...' infoType={MessageBoxTypes.Loading}/>}
      {isLoadingDelete && <MessageBox text='Брисање гласања...' infoType={MessageBoxTypes.Loading}/>}
      {isLoadingUpdateActivity && <MessageBox text='Мењање стања активности код гласања...' infoType={MessageBoxTypes.Loading}/>}
      {isLoadingSend && <MessageBox text='Шаље се глас...' infoType={MessageBoxTypes.Loading}/>}
    </div>
  );
}

export default Polls;
