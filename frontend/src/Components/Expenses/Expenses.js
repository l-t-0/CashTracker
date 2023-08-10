import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import { useGlobalContext } from "../../context/globalContext";
import FinanceItem from "../FinanceItem/FinanceItem";
import ExpenseForm from "../Form/ExpenseForm";
import { arrowup, arrowdown } from "../../utils/Icons";

function Expense() {
  const { expense, getExpenses, deleteExpense, totalExpenses } =
    useGlobalContext();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    getExpenses();
  });

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleToggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedExpense = expense.sort((a, b) => {
    if (sortOrder === "asc") {
      if (sortBy === "amount") {
        return a.amount - b.amount;
      }
      return a[sortBy].localeCompare(b[sortBy]);
    } else {
      if (sortBy === "amount") {
        return b.amount - a.amount;
      }
      return b[sortBy].localeCompare(a[sortBy]);
    }
  });

  return (
    <IncomeStyled>
      <InnerLayout>
        <h2 className="total-income">
          Total Expense: <span>€{totalExpenses()}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            <div className="sort-container">
              <label htmlFor="sort">Sort by:</label>
              <div className="selects">
                <select id="sort" value={sortBy} onChange={handleSortChange}>
                  <option value="createdAt">Recently Added</option>
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                </select>
              </div>
              <button className="toggle-btn" onClick={handleToggleSortOrder}>
                {sortOrder === "asc" ? (
                  <> Ascending {arrowup} </>
                ) : (
                  <> Descending {arrowdown} </>
                )}
              </button>
            </div>
            {sortedExpense.map((expense) => {
              const { _id, title, amount, date, category, type } = expense;
              console.log(expense);
              return (
                <FinanceItem
                  key={_id}
                  id={_id}
                  title={title}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }

  .sort-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
  }

  label {
    font-size: 1rem;
    font-weight: bold;
    color: var(--color-accent);
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, .6);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .toggle-btn {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background-color: var(--color-accent);
    color: #fff;
    border: none;
    cursor: pointer;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    transition: background-color 0.3s ease;
  }

  .toggle-btn:hover {
    background-color: var(--color-green);
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.6);
    }
  }
`;
export default Expense;
