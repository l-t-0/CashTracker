import React, { useState } from "react";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import { plus } from "../../utils/Icons";
import Button from "../Button/Button";

function Form() {
  const { addIncome, incomeCategories, setError, error } =
    useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const { title, amount, date, category } = inputState;
  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(inputState);
    setInputState({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={title}
          placeholder="Income Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          value={amount}
          name={amount}
          placeholder="Income Amount"
          onChange={handleInput("amount")}
        />
      </div>
      <div className="date-category-container">
        <div className="input-control">
          <DatePicker
            id="date"
            placeholderText="Enter A Date"
            selected={date}
            dateFormat="dd/MM/yyyy"
            autoComplete="off"
            onChange={(date) => {
              setInputState({ ...inputState, date: date });
            }}
          />
        </div>
        <div className="selects input-control">
          <select
            required
            value={category}
            name="category"
            id="category"
            onChange={handleInput("category")}
          >
            <option value="" disabled>
              Select Option
            </option>
            {incomeCategories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="submit-btn">
        <Button
          name={"Add Income"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-palepink"}
          color={"#fff"}
        />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .date-category-container {
    display: flex;
    gap: 0.5rem;
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      align-items: center;
      justify-content: center;
      flex: 1;
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
export default Form;
