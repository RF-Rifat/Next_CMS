'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  TimeScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register all chart components you plan to use
ChartJS.register(
  CategoryScale,        // x-axis (bar, line)
  LinearScale,          // y-axis (bar, line)
  RadialLinearScale,    // radar, polar area
  TimeScale,            // for time-based line/bar charts
  BarElement,           // bar chart
  LineElement,          // line chart
  PointElement,         // line/radar points
  ArcElement,           // doughnut, pie
  Filler,               // for gradient fill in line charts
  Title, Tooltip, Legend
);
