const express = require('express');
const connectDB = require('./src/config/db');
const userProfileRoutes =require('./src/routes/userProfileRoutes')
const authRoutes =require('./src/routes/authRoutes')
const categoryRoutes = require('./src/routes/categoryRoutes')
const createPostRoutes = require('./src/routes/createPostRoutes')

const  cors =require('cors');


// from express
const app = express();
const port = 5000;
app.use(cors());

connectDB();

// imporet env
require("dotenv").config();
app.use(express.json());


app.use("/uploads", express.static(__dirname + "/uploads")); /**making upload file public as it only take public file */


// register and create profile
app.use('/user', userProfileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/posts', createPostRoutes);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


