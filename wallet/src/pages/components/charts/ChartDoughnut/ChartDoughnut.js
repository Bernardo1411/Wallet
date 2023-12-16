import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import "./ChartDoughnut.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartDoughnut = (props) => {
  let totalValue = [1];
  let expensesTags = ["none"];

  if (props.total && props.total.length > 0) {
    totalValue = props.total;
    expensesTags = props.expensesTags;
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
      },
      title: {
        display: true,
        text: "Total Expense per Tag",
        color: "#000",
        font: {
          family: 'roboto',
          size: '16px'
        }
      },
    },
  };

  const data = {
    labels: [...expensesTags],
    datasets: [
      {
        label: "Expenses",
        data: [...totalValue],
        backgroundColor: [
          "rgba(228, 224, 255, 1)",
          "rgba(153, 19, 19, 1)",
          "rgba(131, 170, 23, 1)",
          "rgba(000, 000, 000, 1)",
          "rgba(177, 87, 14, 1)",
        ],
        borderColor: [
          "rgba(228, 224, 255, 1)",
          "rgba(153, 19, 19, 1)",
          "rgba(131, 170, 23, 1)",
          "rgba(000, 000, 000, 1)",
          "rgba(177, 87, 14, 1)",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="wallet_chart_doughnut">
      <div className="wallet_chart_doughnut_content">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartDoughnut;
