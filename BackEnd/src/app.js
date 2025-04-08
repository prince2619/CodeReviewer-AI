const express = require('express');
const cors = require('cors');  // Require the CORS package
const aiRoutes = require("./routes/ai.routes");

const app = express();

// Enable CORS - Add this before your routes
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

// Parse JSON bodies - this is correct
app.use(express.json());

// Basic route - this is fine
app.get('/', (req, res) => {
  res.send('<h1>Hello world from server end</h1>');
});

// AI routes - this is correct
app.use('/ai', aiRoutes);

module.exports = app;