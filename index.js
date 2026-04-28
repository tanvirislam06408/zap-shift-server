const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

const PORT = process.env.PORT || 5000;


// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Hello World! Server is running!');
});

// Add a sample API route
app.get('/api', (req, res) => {
  res.json({ message: 'This is your API endpoint.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});