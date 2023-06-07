// main.js

const fetchBooksButton = document.getElementById('fetchBooksButton');
const createBookForm = document.getElementById('createBookForm');
const logoutButton = document.getElementById('logoutButton');

// Fetch books button click
fetchBooksButton.addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:4001/books');

    if (response.ok) {
      const data = await response.json();
      console.log('Fetched books:', data);
      renderTable(data);
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

const renderTable = (data) => {
  const table = document.createElement('table');
  table.classList.add('table');

  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['#', 'Title', 'Author', 'Actions'];
  headers.forEach((headerText) => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement('tbody');
  data.forEach((book) => {
    const row = document.createElement('tr');
    const numberCell = document.createElement('th');
    numberCell.setAttribute('scope', 'row');
    numberCell.textContent = book.id;

    const nameCell = document.createElement('td');
    nameCell.textContent = book.title;

    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;

    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.setAttribute('onclick', `deleteBook(${book.id})`);
    deleteButton.textContent = 'Delete';
    actionsCell.appendChild(deleteButton);

    row.appendChild(numberCell);
    row.appendChild(nameCell);
    row.appendChild(authorCell);
    row.appendChild(actionsCell);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  // Append the table to an existing HTML element (e.g., a div with id 'booksTable')
  const booksTable = document.getElementById('booksTable');
  booksTable.innerHTML = '';
  booksTable.appendChild(table);
};

const logout = () => {
  console.log('Logging out...');
  localStorage.removeItem('token');
  window.location.href = '/login';
}

logoutButton.addEventListener('click', logout);
