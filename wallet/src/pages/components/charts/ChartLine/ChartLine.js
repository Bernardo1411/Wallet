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
          color: "#000",
        }
      },
      title: {
        display: true,
        text: "Total Expenses Over Time",
        color: "#000",
        font: {
          family: 'roboto',
          size: '16px'
        }
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#000",
          font: {
            size: 14,
          },
        },
        grid: {
          color: '#ABAAAA',
          lineWidth: 1,
        },
        min: 0,
      },
      x: {
        ticks: {
          color: "#000",
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
        borderColor: "#000",
        backgroundColor: "#000",
        borderWidth: 2,
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
