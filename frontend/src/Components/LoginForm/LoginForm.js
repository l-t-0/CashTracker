import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";

function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials;

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          type="text"
          value={username}
          name={username}
          placeholder="Username"
          onChange={handleInput("username")}
        />
      </div>
      <div className="input-control">
        <input
          type="password"
          value={password}
          name={password}
          placeholder="Password"
          onChange={handleInput("password")}
        />
      </div>
      <div className="submit-btn">
        <Button
          name={"Login"}
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

export default LoginForm;
