// index.js

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory database (Replace this with an actual database in production)
const users = [];

// Register a new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Create a new user object
    const newUser = {
      id: users.length + 1,
      username,
      password: hash,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Add the user to the database
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login and generate a JWT token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Compare the provided password with the stored hash
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key

    res.json({ token });
  });
});

// Start the server
app.listen(4000, () => {
  console.log('Authentication module is running on port 4000');
});
