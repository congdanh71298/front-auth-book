// main.js

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const fetchBooksButton = document.getElementById('fetchBooksButton');
  const createBookForm = document.getElementById('createBookForm');
  const booksList = document.getElementById('booksList');
  const getBookButton = document.getElementById('getBookButton');
  const deleteBookButton = document.getElementById('deleteBookButton');
  const getUserBooksButton = document.getElementById('getUserBooksButton');

  // Register form submission
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = registerForm.querySelector('#username').value;
    const password = registerForm.querySelector('#password').value;

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        console.log('Registration successful');
        registerForm.reset();
      } else {
        const data = await response.json();
        console.log('Registration failed:', data.message);
      }
    } catch (error) {
      console.log('Registration failed:', error.message);
    }
  });

  // Login form submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = loginForm.querySelector('#username').value;
    const password = loginForm.querySelector('#password').value;

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        console.log('Login successful:', token);

        // Save token to local storage or session storage for future requests
        localStorage.setItem('token', token);
        sessionStorage.setItem('token', token);

        loginForm.reset();
      } else {
        const data = await response.json();
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.log('Login failed:', error.message);
    }
  });

  // Fetch books button click
  fetchBooksButton.addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:4001/books');

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched books:', data);

        // Display books in the UI
        booksList.innerHTML = '';
        data.forEach((book) => {
          const li = document.createElement('li');
          li.textContent = `${book.title} by ${book.author}`;
          booksList.appendChild(li);
        });
      } else {
        const data = await response.json();
        console.log('Failed to fetch books:', data.message);
      }
    } catch (error) {
      console.log('Failed to fetch books:', error.message);
    }
  });

  // Create book form submission
  createBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = createBookForm.querySelector('#title').value;
    const author = createBookForm.querySelector('#author').value;
    const publication_date = createBookForm.querySelector('#publication_date').value;
    const description = createBookForm.querySelector('#description').value;

    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage or session storage
      const response = await fetch('http://localhost:4001/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ title, author, publication_date, description })
      });

      if (response.ok) {
        console.log('Book created successfully');
        createBookForm.reset();
      } else {
        const data = await response.json();
        console.log('Failed to create book:', data.message);
      }
    } catch (error) {
      console.log('Failed to create book:', error.message);
    }
  });

  // Get single book by ID
  const getSingleBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:4001/books/${bookId}`);

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched book:', data);

        // Display book details in the UI
        const bookDetails = document.getElementById('bookDetails');
        bookDetails.textContent = `${data.title} by ${data.author}, published on ${data.publication_date}. Description: ${data.description}`;
      } else {
        const data = await response.json();
        console.log('Failed to fetch book:', data.message);
      }
    } catch (error) {
      console.log('Failed to fetch book:', error.message);
    }
  };

  // Delete single book by ID
  const deleteBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage or session storage
      const response = await fetch(`http://localhost:4001/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token
        }
      });

      if (response.ok) {
        console.log('Book deleted successfully');
      } else {
        const data = await response.json();
        console.log('Failed to delete book:', data.message);
      }
    } catch (error) {
      console.log('Failed to delete book:', error.message);
    }
  };

  // Get books of a specific user
  const getBooksOfUser = async (userId) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage or session storage
      const response = await fetch(`http://localhost:4001/books/user/${userId}`, {
        headers: {
          'Authorization': token
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched user books:', data);

        // Display user books in the UI
        const userBooksList = document.getElementById('userBooksList');
        userBooksList.innerHTML = '';
        data.forEach((book) => {
          const li = document.createElement('li');
          li.textContent = `${book.title} by ${book.author}`;
          userBooksList.appendChild(li);
        });
      } else {
        const data = await response.json();
        console.log('Failed to fetch user books:', data.message);
      }
    } catch (error) {
      console.log('Failed to fetch user books:', error.message);
    }
  };

  getBookButton.addEventListener('click', () => {
    bookId = document.getElementById('bookId').value;
    getSingleBook(bookId);
  });

  deleteBookButton.addEventListener('click', () => {
    bookId = document.getElementById('deleteBookId').value;
    deleteBook(bookId);
  });

  getUserBooksButton.addEventListener('click', () => {
    userId = document.getElementById('userId').value;
    getBooksOfUser(userId);
  });
});
