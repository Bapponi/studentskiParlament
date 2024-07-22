import React, { useEffect, useState } from 'react';
import './polls.css';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import Button from '../button/Button';

Chart.register(ArcElement, Tooltip, Legend);

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

  const data = {
    labels: pollOptions.map(option => option.option_name),
    datasets: [
      {
        data: pollOptions.map(option => option.votes_num),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

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

  return (
    <div className='poll-container'>
      <h3>{id} - {title} - </h3>
      {/* <Pie data={data} /> */}
      <div>
        {pollOptions.map((entry, index) => (
          <div key={index}>
            {entry.option_name} - {entry.votes_num}
          </div>
        ))}
      </div>
      <img src="bin.png" alt="bin" className='poll-admin poll-delete' onClick={deletePoll}/>
      <button className='poll-admin poll-toggle__active'>
        {active ? (<h3>Деактивирај</h3>) : (<h3>Активирај</h3>)}
      </button>
    </div>
  );
}

export default Poll;
