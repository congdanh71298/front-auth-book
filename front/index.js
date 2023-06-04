const express = require('express');
const app = express();
app.use(express.static('public'));

// Set the view engine to use EJS
app.set('view engine', 'ejs');

// Define a route to render the HTML file
app.get('/', (req, res) => {
  res.render('index'); // Replace 'index' with the name of your EJS file
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
