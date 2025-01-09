const express = require('express') // Import Express for routing
const router = express.Router() // Create a new router instance

// Import controller functions for handling book-related operations
const { newBook, updateExistingBook, retrieveAllBooks, retrieveOneBook, removeBook } = require("../controllers/BooksControllers");

// Import authorization middleware
const { authorizeUser } = require('../middleware/authentication');

router.route('/')
  .get(retrieveAllBooks) // GET route to retrieve all books
  .post(newBook) // POST route to create a new book

router.route('/:id')
  .get(retrieveOneBook) // GET route to retrieve a specific book by ID
  .put(updateExistingBook) // PUT route to update a specific book by ID
  .delete(authorizeUser, removeBook) // DELETE route to remove a book by ID, with user authorization middleware for admin access

module.exports = router
