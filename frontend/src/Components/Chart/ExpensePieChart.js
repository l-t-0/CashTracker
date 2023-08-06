import { useGlobalContext } from '../../context/globalContext';
import styled from 'styled-components';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js';

ChartJs.register();

function ExpensePieChart() {
  const { expense } = useGlobalContext();

  // Calculate the total expenses for each category
  const categories = {};
  expense.forEach((e) => {
    if (categories[e.category]) {
      categories[e.category] += e.amount;
    } else {
      categories[e.category] = e.amount;
    }
  });

  
  const pastelColours = [
    '#FFD3B5', // Light peach
    '#FFECB5', // Light yellow
    '#C6E2E9', // Light blue
    '#E1D5E7', // Light lavender
    '#D1F2EB', // Light mint
    '#F9CB9C', // Light coral
    '#C9C6E1', // Light lilac
    '#F0D0C0', // Light blush
    '#F6CFCA', // Light rose
    '#E3F0D4', // Light green
    '#FDE2E2', // Light pink
    '#E2F0CB', // Light lime
    '#B5EAD7', // Light aqua
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
