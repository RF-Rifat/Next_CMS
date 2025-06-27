'use client';
import React from 'react';
import { FC } from 'react';
import './chartjs';
import { Radar } from 'react-chartjs-2';

export const RadarChart: FC = () => {
  const data = {
    labels: ['Strength', 'Speed', 'Endurance', 'Agility', 'Intellect'],
    datasets: [
      {
        label: 'Player 1',
        data: [65, 59, 90, 81, 56],
        backgroundColor: 'rgba(99, 102, 241, 0.3)', // indigo-500 opacity
        borderColor: 'rgba(99, 102, 241, 1)',
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
      },
      {
        label: 'Player 2',
        data: [28, 48, 40, 19, 96],
        backgroundColor: 'rgba(16, 185, 129, 0.3)', // green-500 opacity
        borderColor: 'rgba(16, 185, 129, 1)',
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Player Stats (Radar)' },
    },
  };

  return <Radar data={data} options={options} />;
};
