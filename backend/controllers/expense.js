const ExpenseSchema = require("../models/expenseModel")

exports.addExpense = async (req, res) => {
    const {title, amount, category, date} = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        date
    })

    try {
        if(!title || !category || !date){
            return res.status(400).json({message: 'All fields required!'})
        }
        if(amount <= 0 || !amount ){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await expense.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(expense)
}

exports.getExpense = async (req, res) =>{
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    }   catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense) =>{
        res.status(200).json({message: 'Expense Deleted'})
    })
    .catch((err) =>{
        res.status(500).json({message: 'Server Error'})
    })
}
