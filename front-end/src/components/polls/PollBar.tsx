import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

interface PollOption {
  option_name: string;
  votes_num: number;
}

interface PollBarProps {
  pollOptions: PollOption[];
}

const PollBar: React.FC<PollBarProps> = ({ pollOptions }) => {
  const data = {
    labels: pollOptions.map(option => option.option_name),
    datasets: [
      {
        label: '',
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

  return (
    <div className='bar-chart'>
      <Bar data={data} options={options} />
    </div>
  );
}

export default PollBar;
