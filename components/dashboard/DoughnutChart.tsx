'use client';
import React from 'react';
import { FC } from 'react';
import './chartjs';
import { Doughnut } from 'react-chartjs-2';

export const DoughnutChart: FC = () => {
  const data = {
    labels: ['Desktop', 'Tablet', 'Mobile'],
    datasets: [
      {
        label: 'Users',
        data: [55, 25, 20],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',  // indigo-500
          'rgba(16, 185, 129, 0.8)',  // green-500
          'rgba(234, 179, 8, 0.8)',   // yellow-500
        ],
        hoverOffset: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      title: { display: true, text: 'User Devices Distribution (Doughnut)' },
    },
  };

  return <Doughnut data={data} options={options} />;
};
