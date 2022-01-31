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

import "./ChartLine.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = (props) => {
  const { totalExpenses } = props;

  const labels = totalExpenses.map((expense) => expense.date);

  const options = {
    layout: {
      autoPadding: true,
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
        }
      },
      title: {
        display: true,
        text: "Total Expenses Over Time",
        color: "#fff",
        font: {
          family: 'roboto',
          size: '16px'
        }
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#fff",
          font: {
            size: 14,
          },
        },
        grid: {
          color: 'rgb(123, 116, 165, 0.2)',
          lineWidth: 3,
        },
        min: 0,
      },
      x: {
        ticks: {
          color: "#fff",
          font: {
            size: 14,
          },
        },
      }
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Total Expense",
        data: totalExpenses.map((expense) => expense.despesaTotal),
        borderColor: "rgba(187, 179, 234, 0.5)",
        backgroundColor: "#7b74a5",
        borderWidth: 10,
      },
    ],
  };

  return (
    <div className="wallet_chart_line">
      <div className="wallet_chart_line_content">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default Chart;
