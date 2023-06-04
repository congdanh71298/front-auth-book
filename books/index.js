// index.js

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory database (Replace this with an actual database in production)
const books = [];

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
}

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Get a single book
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);

  const book = books.find((book) => book.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

// Get books of a specific user
app.get('/books/user/:userId', verifyToken, (req, res) => {
  const userId = parseInt(req.params.userId);

  const userBooks = books.filter((book) => book.user_id === userId);
  res.json(userBooks);
});

// Create a new book
app.post('/books', verifyToken, (req, res) => {
  const { title, author, publication_date, description } = req.body;
  const userId = req.userId;

  // Create a new book object
  const newBook = {
    id: books.length + 1,
    title,
    author,
    publication_date,
    description,
    user_id: userId,
    created_at: new Date(),
    updated_at: new Date(),
  };

  // Add the book to the database
  books.push(newBook);

  res.status(201).json({ message: 'Book created successfully' });
});

// Delete a book
app.delete('/books/:id', verifyToken, (req, res) => {
  const bookId = parseInt(req.params.id);

  const index = books.findIndex((book) => book.id === bookId);
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books.splice(index, 1);

  res.json({ message: 'Book deleted successfully' });
});

// Start the server
app.listen(4001, () => {
  console.log('Books module is running on port 4001');
});
