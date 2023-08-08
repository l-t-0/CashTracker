import { useGlobalContext } from "../../context/globalContext";
import styled from "styled-components";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js";

ChartJs.register();

function ExpensePieChart() {
  const { expense } = useGlobalContext();

  const categories = {};
  expense.forEach((e) => {
    if (categories[e.category]) {
      categories[e.category] += e.amount;
    } else {
      categories[e.category] = e.amount;
    }
  });

  const pastelColours = [
    "#FFD3B5",
    "#FFECB5",
    "#C6E2E9",
    "#E1D5E7",
    "#D1F2EB",
    "#F9CB9C",
    "#C9C6E1",
    "#F0D0C0",
    "#F6CFCA",
    "#E3F0D4",
    "#FDE2E2",
    "#E2F0CB",
    "#B5EAD7",
  ];

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: pastelColours,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = data.labels[context.dataIndex];
            const value = data.datasets[0].data[context.dataIndex];
            return `${label}: €${value}`;
          },
        },
      },
    },
  };

  return (
    <ChartStyled>
      <Pie data={data} options={options} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: none;
  padding: 1rem;
  height: 100%;
`;

export default ExpensePieChart;
