'use client';
import './chartjs';
import { Line } from 'react-chartjs-2';

export const LineChartMinimal = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        data: [20, 40, 30, 60, 50],
        borderColor: '#14b8a6',
        tension: 0.3,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return <Line data={data} options={options} />;
};
