require('dotenv').config();
const mongoose = require('mongoose')
// Shifted to env file

const connectDB = () => {
    mongoose.set('strictQuery', true);
    return mongoose.connect(process.env.connectionString).then(() => console.log("Connected to DB"))
} // This is returning a promise

module.exports = connectDB