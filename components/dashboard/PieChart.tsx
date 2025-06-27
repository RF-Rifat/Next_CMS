'use client';
import React from 'react';
import { FC } from 'react';
import './chartjs';
import { Pie } from 'react-chartjs-2';

export const PieChart: FC = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Votes',
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)', // red-500
          'rgba(59, 130, 246, 0.7)', // blue-500
          'rgba(234, 179, 8, 0.7)',  // yellow-500
        ],
        borderWidth: 1,
        borderColor: 'white',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'right' as const },
      title: { display: true, text: 'Favorite Colors (Pie)' },
    },
  };

  return <Pie data={data} options={options} />;
};
