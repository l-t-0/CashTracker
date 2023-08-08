import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { trash, list } from "../../utils/Icons";

function CategoryItem({ id, name, deleteCategory }) {
  return (
    <CategoryItemStyled>
      <div className="icon">{list}</div>
      <div className="content">
        <h5>{name}</h5>
      </div>
      <div className="btn-con">
        <Button
          icon={trash}
          bPad={"0.5rem"}
          bRad={"50%"}
          bg={"var(--primary-color"}
          color={"#fff"}
          hColor={"var(--color-green)"}
          onClick={() => deleteCategory(id)}
        />
      </div>
    </CategoryItemStyled>
  );
}

const CategoryItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  height: 60px; // You can adjust this value to your desired height

  .icon {
    width: 50px; // You can adjust this value
    height: 50px; // You can adjust this value
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem; // You can adjust this value
      padding-left: 1rem; // You can adjust this value
      position: relative;
      opacity: 0.8;
    }
  }

  .btn-con {
    display: flex;
    align-items: center;
  }
`;

export default CategoryItem;
