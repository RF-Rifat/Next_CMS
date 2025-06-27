'use client';
import './chartjs';
import { Doughnut } from 'react-chartjs-2';

export const DoughnutChartWithCutout = () => {
  const data = {
    labels: ['Used', 'Remaining'],
    datasets: [
      {
        label: 'Storage',
        data: [70, 30],
        backgroundColor: ['#f97316', '#e5e7eb'],
        cutout: '80%',
      },
    ],
  };

  return <Doughnut data={data} />;
};
