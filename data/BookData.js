const { NotFoundError, BadRequestError } = require("../errors"); // Import custom error classes for handling not found and bad request errors

const books = [] // In-memory array to store book objects

// Returns the total number of books in the array
const getNumberOfBooks = () => books.length;

// Retrieves a book by its ID
const getBookByID = (id) => {
    return books.find((b) => b.id === Number(id)); // Find and return the book that matches the ID
}

// Retrieves all books
const getAllBooks = () => books; // Return the entire books array

// Adds a new book to the in-memory data store
const addBook = (book) => books.push(book); // Push the new book object into the books array

// Updates an existing book by its ID
const updateBook = ({id, title, author, year}) => {
    const index = books.findIndex((b) => b.id === Number(id)); // Find the index of the book by ID

    // If no book is found with the provided ID, throw a NotFoundError
    if (index === -1) {
        throw new NotFoundError(`No book found with id: ${id}`);
    }

    // Update the book's details at the found index
    books[index] = { ...books[index], title, author, year };

    return books[index]; // Return the updated book object
};

// Deletes a book by its ID
const deleteBook = (id) => {
    const book = getBookByID(id); // Get the book by ID

    // If no book is found, throw a BadRequestError
    if (!book) throw new BadRequestError(`No book found with id: ${id}`);

    // Filter out the book from the array and return the remaining books
    const remainingBooks = books.filter((b) => b.id !== Number(id));

    return remainingBooks;
};

module.exports = { getNumberOfBooks, getAllBooks, getBookByID, updateBook, addBook, deleteBook };
