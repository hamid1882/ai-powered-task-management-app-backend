const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add OPTIONS handling for preflight requests
app.options('*', cors());
app.use(express.json());

const db = require("../config/db");
const userRoutes = require('../routes/userRoutes');
const taskRoutes = require('../routes/taskRoutes');
const suggestionRoutes = require('../routes/suggestionRoutes');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/suggestions', suggestionRoutes);

// Connect to database before wrapping the app
db.connect()
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Export the serverless function
module.exports.handler = serverless(app);