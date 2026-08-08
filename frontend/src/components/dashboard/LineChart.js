import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function LineChart({ data, label = "Value", color = "rgba(65, 132, 243, 1)", bgColor = "rgba(65, 132, 243, 0.1)" }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#111827',
        titleFont: { family: 'Inter', size: 13 },
        bodyFont: { family: 'Inter', size: 13 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: '#9b9b9b',
          maxTicksLimit: 6
        }
      },
      y: {
        grid: {
          color: '#eeeeee',
          drawBorder: false,
          borderDash: [5, 5],
        },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: '#9b9b9b',
          callback: function(value) {
            return '₹' + (value >= 1000 ? value / 1000 + 'k' : value);
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
        point: {
            radius: 0,
            hoverRadius: 6,
        }
    }
  };

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        fill: true,
        label,
        data: data.map(d => d.value),
        borderColor: color,
        backgroundColor: bgColor,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return <div style={{ position: "relative", height: "260px", width: "100%" }}><Line options={options} data={chartData} /></div>;
}
