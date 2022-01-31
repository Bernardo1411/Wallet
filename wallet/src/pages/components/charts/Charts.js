import React from "react";

import ChartLine from "./ChartLine/ChartLine";
import ChartDoughnut from "./ChartDoughnut/ChartDoughnut";

import "./Charts.css";

const Charts = (props) => {
  const { expenses, totalExpenses } = props;

  const totalTag = (tag) => {
    return expenses
      .filter((expense) => expense.tag === tag)
      .map((expense) => ({
        value: Number(expense.value),
        exchange: Number(expense.exchangeRates[`${expense.currency}`].ask),
      }))
      .reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.value * currentValue.exchange,
        0
      );
  };

  const expensesTags = new Set(expenses.map((expense) => expense.tag));

  let total = [];

  expensesTags.forEach((tag) => total.push(totalTag(tag)));

  return (
    <div className="wallet_charts">
      <ChartLine totalExpenses={totalExpenses} />
      <ChartDoughnut total={total} expensesTags={expensesTags} />
    </div>
  );
};

export default Charts;
