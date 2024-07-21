import React, { useEffect, useState } from 'react';
import './polls.css';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface PollOption {
  option_name: string;
  votes_num: number;
}

interface PollProps {
  id: number;
  title: string;
  pollOptions: PollOption[];
}

const Poll: React.FC<PollProps> = ({ id, title, pollOptions }) => {
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

  return (
    <div className='poll-container'>
      <h3>{id} - {title}</h3>
      {/* <Pie data={data} /> */}
      <div>
        {pollOptions.map((entry, index) => (
          <div key={index}>
            <span>{entry.option_name}</span> - {entry.votes_num}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Poll;
