import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import Chart from "../Chart/Chart";
import { euro } from "../../utils/Icons";
import { useGlobalContext } from "../../context/globalContext";
import ExpensePieChart from "../Chart/ExpensePieChart";
import IncomePieChart from "../Chart/IncomePieChart";

function Dashboard() {
  const { totalExpenses, totalIncome, totalBalance, getIncome, getExpenses } =
    useGlobalContext();

  useEffect(() => {
    getIncome();
    getExpenses();
  });

  return (
    <DashboardStyled>
      <InnerLayout>
        <div className="stats-con">
          <div className="chart-con">
            <div className="balance">
              <h2>Total Balance</h2>
              <p>
                {euro} {totalBalance()}
              </p>
            </div>
            <div className="pie-charts">
              <div className="pie-chart-container">
                <h2>Total Expenses</h2>
                <p className="amount">
                  {euro} {totalExpenses()}
                </p>
                <ExpensePieChart />
              </div>
              <div className="pie-chart-container">
                <h2>Total Income</h2>
                <p className="amount">
                  {euro} {totalIncome()}
                </p>
                <IncomePieChart />
              </div>
            </div>
            <div className="main-chart-container">
              <Chart />
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    .chart-con {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 2rem;

      .pie-charts {
        display: flex;
        gap: 2rem;
        margin-top: 2rem;
      }

      .main-chart-container {
        flex-grow: 1;
        position: relative;
        height: 60vh;
        width: 100%;
        margin-bottom: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .pie-chart-container {
        flex-grow: 1;
        flex: 1;
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem;
        h2 {
          margin-bottom: 1rem;
        }
        .amount {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-green);
        }
      }

      .balance {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          color: var(--color-green);
          opacity: 0.6;
          font-size: 4.5rem;
        }
      }
    }
  }
`;

export default Dashboard;
