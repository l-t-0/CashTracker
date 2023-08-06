import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/v1/';


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [income, setIncome] = useState([])
    const [expense, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [incomeCategories, setIncomeCategories] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [customIncomeCategories, setCustomIncomeCategories] = useState([]);
    const [customExpenseCategories, setCustomExpenseCategories] = useState([]);


    const defaultIncomeCategories = ["Wage", "Freelancing", "Investments", "Gift", "Other"]
    const defaultExpenseCategories = ["Rent", "Groceries", "Utilities", "Restaurants", "Travel", "Health", "Clothing", "Other"]


    useEffect(() => {
        initializeCategories();
        getCategories();
    }, []);

    const initializeCategories = async () => {
        const response = await axios.get(`${BASE_URL}get-categories`);
        const existingCategories = response.data.map(cat => cat.name);
    
        defaultIncomeCategories.forEach((category) => {
            if (!existingCategories.includes(category)) {
                addCategory({name: category, type: 'income'});
            }
        });
    
        defaultExpenseCategories.forEach((category) => {
            if (!existingCategories.includes(category)) {
                addCategory({name: category, type: 'expense'});
            }
        });
    }


    const getCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-categories`);
            
    
            console.log('Raw response data:', response.data);
    
            const incomeCats = response.data.filter(cat => cat.type === 'income');
            const expenseCats = response.data.filter(cat => cat.type === 'expense');

            console.log('Income categories:', incomeCats);
            console.log('Expense categories:', expenseCats);

        
            setIncomeCategories(incomeCats);
            setExpenseCategories(expenseCats);
            
            const customIncomeCats = incomeCats.filter(category => !defaultIncomeCategories.includes(category.name));
            const customExpenseCats = expenseCats.filter(category => !defaultExpenseCategories.includes(category.name));

            console.log('Custom income categories:', customIncomeCats);
            console.log('Custom expense categories:', customExpenseCats);
    
            
            setCustomIncomeCategories(customIncomeCats);
            setCustomExpenseCategories(customExpenseCats);
            
        } catch (error) {
            setError(error.response?.data?.message || "Unexpected error");
        }
    }
    

    const addCategory = async (category) => {
        const response = await axios.post(`${BASE_URL}add-category`, category)
            .catch((err) => {
                setError(err.response.data.message)
            })
    }

    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
        .catch((err) =>{
            setError(err.response.data.message)
        })
    }

    const getIncome = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncome(response.data)
    }

    const deleteCategory = async (id) => {

        let categoryToDelete;
        for (const category of customIncomeCategories.concat(customExpenseCategories)) {
            if (category._id === id) {
                categoryToDelete = category.name;
                break;
            }
        }
        
        if (!categoryToDelete) {
            console.error('Category not found');
            return;
        }
    
        income.forEach(async (inc) => {
            if (inc.category === categoryToDelete) {
                await deleteIncome(inc._id);
            }
        });
    
        expense.forEach(async (exp) => {
            if (exp.category === categoryToDelete) {
                await deleteExpense(exp._id);
            }
        });
    
        const res = await axios.delete(`${BASE_URL}delete-category/${id}`);
        getCategories(); 
    }
    


    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncome()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        income.forEach((income) =>{
            totalIncome = totalIncome += income.amount
        })
        return totalIncome;
    }


    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expense)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expense.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncome,
            income,
            expense,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            error,
            setError,
            totalBalance,
            addCategory,
            getCategories,
            deleteCategory,
            customIncomeCategories,
            customExpenseCategories,
            incomeCategories,
            expenseCategories
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}