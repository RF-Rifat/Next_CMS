'use client';
import React from 'react';
import { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import './chartjs';

export const BarChart: FC = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [30, 20, 50, 40, 70, 60],
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Tailwind blue-500 opacity
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Monthly Sales (Bar)' },
    },
  };

  return <Bar data={data} options={options} />;
};
