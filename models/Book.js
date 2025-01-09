const { getNumberOfBooks, addBook } = require("../data/BookData");

// Book class to define the structure of book objects
class Book {
    constructor(id, title, author, year) {
        this.id = id; // Assigning book ID
        this.title = title; // Assigning book title
        this.author = author; // Assigning author of the book
        this.year = year; // Assigning year of publication
    }
}

// Function to create a new book
const createBook = ({ title, author, year }) => {
    const id = getNumberOfBooks(); // Get the current number of books to generate a new ID
    const book = new Book(id, title, author, year); // Create a new book object with provided details
    addBook(book); // Add the new book to the in-memory storage (books array)
    return book; // Return the newly created book
};

module.exports = { createBook };
