import React, { useEffect, useState } from 'react';
import './polls.css';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import PollVote from './PollVote'; // Import the new PollVote component

Chart.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

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

  const voteOptions = pollOptions.map(option => ({
    value: option.option_name,
    label: option.option_name
  }));

  const data = {
    labels: pollOptions.map(option => option.option_name),
    datasets: [
      {
        label: ``,
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

  useEffect(() => {
    const num: number = pollOptions.reduce((sum, option) => sum + option.votes_num, 0);
    setVotesSum(num);
  }, [pollOptions]);

  const options = {
    plugins: {
      legend: {
        display: false,
        position: 'right' as const,
        labels: {
          font: {
            size: 18,
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 16, // Increase font size for the x-axis labels
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 16, // Increase font size for the y-axis labels
          },
        },
      },
    },
    elements: {
      bar: {
        hoverBorderWidth: 2,
      }
    },
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
      {!currentActive && (
        <div className='bar-chart'>
          <Bar data={data} options={options} />
        </div>
      )}
      {currentActive && (
        <PollVote
          voteOptions={voteOptions}
        />
      )}
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
  );
}

export default Poll;
