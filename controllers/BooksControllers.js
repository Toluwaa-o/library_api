const { getAllBooks, getBookByID, updateBook, deleteBook } = require("../data/BookData") // Import functions for handling book data
const { BadRequestError, NotFoundError } = require("../errors") // Import custom error classes
const { createBook } = require("../models/Book") // Import the function to create a new book

// Handles the creation of a new book
const newBook = async (req, res) => {
    const { title, author, year } = req.body

    // Ensure all required fields are provided
    if (!title || !author || !year) {
        throw new BadRequestError("Please provide all necessary categories");
    }

    // Create a new book using the provided data
    const book = createBook({ ...req.body });

    // Respond with a success message and the created book
    return res.status(201).json({
        message: `Hi ${req.user.username}, the book was created successfully`,
        book
    });
}

// Handles updating an existing book
const updateExistingBook = async (req, res) => {
    const { title, author, year } = req.body
    const { id } = req.params

    // Ensure all required fields are provided
    if (!id || !title || !author || !year) {
        throw new BadRequestError("Please provide all necessary categories");
    }

    // Update the book with the provided data
    const book = updateBook({ ...req.body, id });

    // Respond with a success message and the updated book
    return res.status(201).json({
        message: `Hi ${req.user.username}, the book was updated successfully`,
        book
    });
}

// Retrieves all books
const retrieveAllBooks = async (req, res) => {
    // Get all books from the in-memory data store
    const books = getAllBooks();

    // Respond with a success message and all books
    return res.status(200).json({
        message: `Hi ${req.user.username}, the books were retrieved successfully`,
        books
    });
}

// Retrieves a single book by its ID
const retrieveOneBook = async (req, res) => {
    const { id } = req.params

    // Ensure a book ID is provided
    if (!id) {
        throw new BadRequestError("No book id provided");
    }

    // Get the book by ID
    const book = getBookByID(id);

    // If no book is found, throw a NotFoundError
    if (!book) throw new NotFoundError(`No book found with id: ${id}`);

    // Respond with a success message and the book
    return res.status(200).json({
        message: `Hi ${req.user.username}, the book was retrieved successfully`,
        book
    });
}

// Handles removing a book by its ID
const removeBook = async (req, res) => {
    const { id } = req.params

    // Ensure a book ID is provided
    if (!id) {
        throw new BadRequestError("No book id provided");
    }

    // Delete the book from the in-memory data store
    const books = deleteBook(id);

    // Respond with a success message and updated books list
    return res.status(200).json({
        message: `Hi ${req.user.username}, the book was deleted successfully`,
        books
    });
}

module.exports = { newBook, updateExistingBook, retrieveAllBooks, retrieveOneBook, removeBook };
