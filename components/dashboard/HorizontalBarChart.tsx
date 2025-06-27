'use client';
import React from 'react';
import { FC } from 'react';
import './chartjs';
import { Bar } from 'react-chartjs-2';

export const HorizontalBarChart: FC = () => {
  const data = {
    labels: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js'],
    datasets: [
      {
        label: 'Stars',
        data: [160000, 180000, 70000, 35000, 90000],
        backgroundColor: 'rgba(251, 191, 36, 0.7)', // yellow-400
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: { position: 'right' as const },
      title: { display: true, text: 'GitHub Stars by Framework (Horizontal Bar)' },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} />;
};
