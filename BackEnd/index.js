const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Successfully connected to the database")
}).catch(err => {
    console.log("Failed to connect with database", err)
})

app.listen(3000, () => {
    console.log("Server listening to port 3000");
})