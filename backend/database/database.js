const mongoose = require('mongoose');

const database = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected successfully!')
    } catch (error) {
        console.log('Database connection error!');
        console.error('Database connection error:', error.message);
    }
}

module.exports = {database}