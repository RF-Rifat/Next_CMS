'use client';
import './chartjs';
import { Bar } from 'react-chartjs-2';

export const BarChartRounded = () => {
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
    datasets: [
      {
        label: 'Views',
        data: [100, 200, 150, 300, 250],
        backgroundColor: '#6366f1',
        borderRadius: 10,
      },
    ],
  };

  return <Bar data={data} />;
};
