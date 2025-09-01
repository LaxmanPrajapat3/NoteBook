const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
// Enable CORS to allow requests from the frontend
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// Define API routes
app.get('/', (req, res) => {
    res.send('NoteApp API is running...');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
