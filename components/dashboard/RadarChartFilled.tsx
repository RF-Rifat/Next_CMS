'use client';
import './chartjs';
import { Radar } from 'react-chartjs-2';

export const RadarChartFilled = () => {
  const data = {
    labels: ['Strength', 'Speed', 'Durability', 'Intelligence', 'Agility'],
    datasets: [
      {
        label: 'Hero A',
        data: [65, 75, 70, 80, 60],
        backgroundColor: 'rgba(59,130,246,0.3)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        pointBackgroundColor: '#3b82f6',
      },
    ],
  };

  return <Radar data={data} />;
};
