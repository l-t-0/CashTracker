import React from 'react'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat';
import { list, calender, circle, clothing, euro, food, freelance, medical, money, piggy, stocks, takeaway, trash, gift, house, utilities } from '../../utils/Icons';
import Button from '../Button/Button';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    deleteItem,
    indicatorColor,
    type
}) {

    const categoryIcon = () =>{
        switch(category) {
            case 'Wage':
                return money;
            case 'Freelancing':
                return freelance
            case 'Investments':
                return stocks;
            case 'Gift':
                return gift;
            case 'Other':
                return piggy;
            default:
                return list;
        }
    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'Rent':
                return house;
            case 'Groceries':
                return food;
            case 'Health':
                return medical;
            case 'Utilities':
                return utilities;
            case 'Restaurants':
                return takeaway;
            case 'Clothing':
                return clothing;
            case 'Travel':
                return freelance;
            case 'Other':
                return circle;
            default:
                return list;
        }
    }


    return (
        <IncomeItemStyled indicator={indicatorColor}>
<div className="icon">
    {type === 'expense' ? expenseCatIcon() : categoryIcon()}
</div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                <div className="text">
    <p>{euro} {amount}</p>
    <p>{calender} {dateFormat(date)}</p>
    <p className="category-text"><div className="plus-icon">{list}</div> {category}</p>
</div>                    <div className="btn-con">
                        <Button 
                            icon={trash}
                            bPad={'0.5rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon{
        width: 80px;
        height: 80px;
        gap: 0.5rem;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
        .category-name {
            font-size: 1rem;
            color: #333;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{

                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default IncomeItem