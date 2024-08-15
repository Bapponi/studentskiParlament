import React, { useEffect, useState } from 'react';
import './polls.css';
import Poll from './Poll';
import { usePoll } from '../../hooks/pollHooks/usePoll';
import { MessageBoxTypes, PollOption, PollProps } from './helpers';
import MessageBox from '../message-box/MessageBox';

function Polls() {

  const {polls, fetchError, isLoadingFetch,
         deletePoll, isLoadingDelete, deleteError, deleteInfo,
         updatePollActivity, updateActivityError, isLoadingUpdateActivity, updateActivityInfo
  } = usePoll();

  const handleDelete = (id: number) => {
    deletePoll({pollToDeleteId :id})
  };

  return (
    <div className='polls-container'>
      <h1 style={{color: "var(--primary-color)"}}>Све активне анкете</h1>
      <div className='polls-content'>
        {polls && polls.map((entry) => (
          <Poll key={entry.id} {...entry} onDelete={handleDelete} onUpdate={updatePollActivity}/>
        ))}
      </div>
      {(deleteError || fetchError || updateActivityError) && 
        <MessageBox text={deleteError || fetchError || updateActivityError} infoType={MessageBoxTypes.Error}/>
      }
      {(deleteInfo || updateActivityInfo) && 
        <MessageBox text={deleteInfo || updateActivityInfo} infoType={MessageBoxTypes.Info}/>
      }
      {isLoadingFetch && <MessageBox text='Учитавају се сва гласања...' infoType={MessageBoxTypes.Loading}/>}
      {isLoadingDelete && <MessageBox text='Брисање гласања...' infoType={MessageBoxTypes.Loading}/>}
      {isLoadingUpdateActivity && <MessageBox text='Мењање стања активности код гласања...' infoType={MessageBoxTypes.Loading}/>}
    </div>
  );
}

export default Polls;
