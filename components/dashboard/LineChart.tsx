'use client';
import React from 'react';
import { FC } from 'react';
import './chartjs';
import { Line } from 'react-chartjs-2';

export const LineChart: FC = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Visitors',
        data: [100, 200, 150, 300, 250, 400],
        borderColor: 'rgba(16, 185, 129, 1)', // Tailwind green-500
        backgroundColor: 'rgba(16, 185, 129, 0.3)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      title: { display: true, text: 'Website Visitors (Line)' },
    },
  };

  return <Line data={data} options={options} />;
};
