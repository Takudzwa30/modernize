"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    x: {
      ticks: {
        padding: 15,
      },
      grid: {
        drawOnChartArea: false,
      },
    },

    y: {
      beginAtZero: true,
      border: { dash: [6, 4], display: false },
      ticks: {
        padding: 15,
      },
    },
  },
  layout: {
    padding: {
      top: 50,
    },
  },
  responsive: true,
  plugins: {
    tooltip: {
      yAlign: "bottom",
      xAlign: "center",
      titleAlign: "center",
      bodyAlign: "center",
      footerAlign: "center",
      backgroundColor: "#333752",
      padding: 12,
      displayColors: false,
      caretPadding: 8,
    },
    legend: {
      position: "top" as const,
      align: "start" as const,
      labels: {
        lineWidth: 0,
        boxWidth: 10,
        borderWidth: 0,
      },
    },
    title: {
      display: false,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "New Users",
      data: [1, 5, 3, 10, 6, 7, 2],
      borderColor: "#1FD286",
      backgroundColor: "#1FD286",
      pointHoverRadius: 7,
      pointHoverBorderWidth: 5,
      hoverRadius: 7,
      pointRadius: 0,
    },
    {
      label: "Returning Users",
      data: [2, 3, 5, 7, 6, 1, 9],
      borderColor: "#1E5EFF",
      backgroundColor: "#1E5EFF",
      pointHoverRadius: 7,
      pointHoverBorderWidth: 5,
      hoverRadius: 7,
      pointRadius: 0,
    },
  ],
};

const Chart = () => {
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;