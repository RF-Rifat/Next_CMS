'use client';
import './chartjs';
import { PolarArea } from 'react-chartjs-2';

export const PolarAreaChartSimple = () => {
  const data = {
    labels: ['Red', 'Green', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Poll Distribution',
        data: [11, 16, 7, 3],
        backgroundColor: ['#ef4444', '#22c55e', '#3b82f6', '#eab308'],
      },
    ],
  };

  return <PolarArea data={data} />;
};
