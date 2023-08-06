const { addExpense, getExpense, deleteExpense } = require('../controllers/expense')
const { addIncome, getIncome, deleteIncome } = require('../controllers/income')
const { addCategory, getCategories, deleteCategory } = require('../controllers/category')


const router = require('express').Router()

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense/', addExpense)
    .get('/get-expenses/', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/add-category', addCategory)
    .get('/get-categories', getCategories)
    .delete('/delete-category/:id', deleteCategory)


module.exports = router


