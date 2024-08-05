const express = require('express');
const connectDB = require('./src/config/db');
const userProfileRoutes =require('./src/routes/userProfileRoutes')
const authRoutes =require('./src/routes/authRoutes')
const categoryRoutes = require('./src/routes/categoryRoutes')
const  cors =require('cors');


// from express
const app = express();
const port = 5000;
app.use(cors());

connectDB();

// imporet env
require("dotenv").config();
app.use(express.json());

// register and create profile
app.use('/user', userProfileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


