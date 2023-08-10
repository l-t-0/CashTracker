import { useGlobalContext } from "../../context/globalContext";
import styled from "styled-components";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js";

ChartJs.register();

function IncomePieChart() {
  const { income } = useGlobalContext();

  const categories = {};
  income.forEach((e) => {
    if (categories[e.category]) {
      categories[e.category] += e.amount;
    } else {
      categories[e.category] = e.amount;
    }
  });

  const chartColours = [
    "#FF8A65",
    "#FFC107",
    "#03A9F4",
    "#AB47BC",
    "#1DE9B6",
    "#FF7043",
    "#5C6BC0",
    "#FFB74D",
    "#FF6B6B",
    "#66BB6A",
    "#FF5252",
    "#9CCC65",
    "#26A69A"    
  ];

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: chartColours,
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

export default IncomePieChart;
