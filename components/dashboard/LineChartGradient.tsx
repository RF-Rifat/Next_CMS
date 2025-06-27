'use client';
import './chartjs';
import { Line } from 'react-chartjs-2';
import { useRef, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js';

export const LineChartGradient = () => {
  const chartRef = useRef<ChartJS<'line'>>(null);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [120, 190, 300, 500, 200],
        fill: true,
        backgroundColor: '' as string | CanvasGradient,
        borderColor: '#3b82f6',
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    data.datasets[0].backgroundColor = gradient;
    chart.update();
  }, []);

  return <Line ref={chartRef} data={data} />;
};
