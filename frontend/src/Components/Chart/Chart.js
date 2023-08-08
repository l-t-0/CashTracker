import { useGlobalContext } from "../../context/globalContext";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { income, expense } = useGlobalContext();

  const allDates = [
    ...new Set([...income.map((i) => i.date), ...expense.map((e) => e.date)]),
  ];
  allDates.sort((a, b) => new Date(a) - new Date(b));

  const balanceData = allDates.map((date) => {
    const totalIncome = income
      .filter((i) => i.date === date)
      .reduce((sum, i) => sum + i.amount, 0);
    const totalExpense = expense
      .filter((e) => e.date === date)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      date,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  });

  const cumulativeBalanceData = balanceData.reduce((acc, curr, index) => {
    if (index === 0) {
      return [curr];
    } else {
      return [
        ...acc,
        { ...curr, balance: acc[index - 1].balance + curr.balance },
      ];
    }
  }, []);

  const data = {
    labels: allDates.map((date) => dateFormat(date)),
    datasets: [
      {
        label: "Total Balance",
        data: cumulativeBalanceData.map((data) => data.balance),
        borderColor: "black",
        borderWidth: 0.5,
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.2,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const customTooltip = {
    callbacks: {
      label: (context) => {
        const dataPoint = cumulativeBalanceData[context.dataIndex];
        const totalBalance = dataPoint.balance;
        const income = dataPoint.totalIncome;
        const expense = dataPoint.totalExpense;
        let tooltipLines = [`Total Balance: €${totalBalance}`];

        if (income > 0) {
          tooltipLines.push(`Income: €${income}`);
        }

        if (expense > 0) {
          tooltipLines.push(`Expense: €${expense}`);
        }
        return tooltipLines;
      },
    },
  };

  const options = {
    scales: {
      y: {
        suggestedMin: 0,
      },
    },
    plugins: {
      tooltip: customTooltip,
    },
  };

  return (
    <ChartStyled>
      <Line data={data} options={options} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  display: flex;
`;

export default Chart;
