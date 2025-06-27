'use client';
import './chartjs';
import { Bar } from 'react-chartjs-2';

export const BarChartStacked = () => {
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Product A',
        data: [200, 300, 400, 500],
        backgroundColor: '#10b981',
      },
      {
        label: 'Product B',
        data: [150, 250, 350, 450],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return <Bar data={data} options={options} />;
};
