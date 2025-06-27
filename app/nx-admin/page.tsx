import React from 'react';
import type { Metadata } from 'next'
import { BarChart } from '@/components/dashboard/BarChart';
import { LineChart } from '@/components/dashboard/LineChart';
import { PieChart } from '@/components/dashboard/PieChart';
import { DoughnutChart } from '@/components/dashboard/DoughnutChart';
import { HorizontalBarChart } from '@/components/dashboard/HorizontalBarChart';
import { RadarChart } from '@/components/dashboard/RadarChart';
import { LineChartGradient } from '@/components/dashboard/LineChartGradient';
import { PolarAreaChartSimple } from '@/components/dashboard/PolarAreaChartSimple';
import { RadarChartFilled } from '@/components/dashboard/RadarChartFilled';
import { BarChartStacked } from '@/components/dashboard/BarChartStacked';
import { DoughnutChartWithCutout } from '@/components/dashboard/DoughnutChartWithCutout';
import { LineChartMinimal } from '@/components/dashboard/LineChartMinimal';
import { BarChartRounded } from '@/components/dashboard/BarChartRounded';

export const metadata: Metadata = {
  title: 'Post - Services',
  description: '',
}

const Index: React.FC = () => {
  return (
    <div className='container p-4'>
      <BarChartRounded />
      <LineChartMinimal />
      <DoughnutChartWithCutout />
      <BarChartStacked />
      <RadarChartFilled />
      <PolarAreaChartSimple />
      <LineChartGradient />
      <BarChart />
      <LineChart />
      <PieChart />
      <DoughnutChart />
      <HorizontalBarChart />
      <RadarChart />
    </div>
  );
};

export default Index;