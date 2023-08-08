import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import CategoryForm from "../CategoryForm/CategoryForm";
import { useGlobalContext } from "../../context/globalContext";
import CategoryItem from "../CategoryItems/CategoryItems";

function Settings() {
  const {
    customIncomeCategories,
    customExpenseCategories,
    deleteCategory,
    getCategories,
  } = useGlobalContext();

  useEffect(() => {
    getCategories();
  });

  return (
    <SettingsStyled>
      <SettingsInnerLayout>
        <FormWrapper>
          <CategoryForm />
        </FormWrapper>
        <SectionWrapper>
          <h3>Custom Income Categories</h3>
          {customIncomeCategories.map((category) => (
            <CategoryItem
              key={category._id}
              id={category._id}
              type={category.type}
              name={category.name}
              deleteCategory={deleteCategory}
            />
          ))}
        </SectionWrapper>
        <SectionWrapper>
          <h3>Custom Expense Categories</h3>
          {customExpenseCategories.map((category) => (
            <CategoryItem
              key={category._id}
              id={category._id}
              type={category.type}
              name={category.name}
              deleteCategory={deleteCategory}
            />
          ))}
        </SectionWrapper>
      </SettingsInnerLayout>
    </SettingsStyled>
  );
}

const SettingsInnerLayout = styled(InnerLayout)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
`;

const SettingsStyled = styled.div`
  display: flex;
  overflow: auto;
`;

const FormWrapper = styled.div`
  width: 33%;
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
`;

const SectionWrapper = styled.div`
  width: 33%;
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
`;

export default Settings;
