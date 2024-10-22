const express = require('express');
const connectDB = require("./config/db");
// const cors = require('cors');
const authRoutes = require('./routes/auth');
const fetchRoutes=require('./routes/fetch')
connectDB();
const app = express();

const cors = require('cors');

// Use CORS to allow requests from frontend (React)
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1', authRoutes);
app.use('/api/getDummy', fetchRoutes);


const PORT =  8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
