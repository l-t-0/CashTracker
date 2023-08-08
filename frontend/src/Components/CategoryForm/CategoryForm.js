import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";
import { useGlobalContext } from "../../context/globalContext";

function CategoryForm() {
  const { addCategory, error } = useGlobalContext();
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");

  const handleInput = (field) => (event) => {
    console.log("Field:", field, "Value:", event.target.value);
    if (field === "categoryName") {
      setCategoryName(event.target.value);
    } else if (field === "categoryType") {
      setCategoryType(event.target.value.toLowerCase());
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (categoryName && categoryType) {
      const category = { name: categoryName, type: categoryType };
      await addCategory(category);
      setCategoryName("");
      setCategoryType("");
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          autoComplete="off"
          type="text"
          value={categoryName}
          name="categoryName"
          placeholder="Input a custom category!"
          onChange={handleInput("categoryName")}
        />
      </div>
      <div className="form-row">
        <div className="selects input-control">
          <select
            required
            value={categoryType}
            name="categoryType"
            id="categoryType"
            onChange={handleInput("categoryType")}
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="placeholder"></div>
      </div>
      <div className="submit-btn">
        <Button
          name={"Save Category"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-palepink"}
          color={"#fff"}
        />
      </div>
      {error && <p>{error}</p>}
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .form-row {
    display: flex;
    justify-content: flex-start; // Aligns to the left
    .placeholder {
      flex-grow: 1; // Takes up the remaining space
    }
  }
  input,
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

export default CategoryForm;
