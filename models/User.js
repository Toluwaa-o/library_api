const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const { addUser, findUserByUsername, getUserCount } = require('../data/UserData'); // Import user data methods
const { BadRequestError } = require('../errors'); // Import custom BadRequestError for error handling

// User class that holds user information and methods related to password hashing
class User {
    constructor(username, password, admin) {
        this.username = username; // Assign username
        this.password = password; // Assign password
        this.admin = admin; // Assign admin status
    }

    // Method to hash password
    async hashPassword() {
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
    }
}

// Function to create a new user
const createUser = async ({ username, password }) => {
    // Check if username already exists
    const usernameExists = findUserByUsername(username);

    // If user exists, throw an error
    if (usernameExists) {
        throw new BadRequestError('User already exists with that username');
    }

    // Assign admin privileges to the first user
    const numOfUsers = getUserCount();
    const admin = numOfUsers === 0;

    // Create a new user object
    const user = new User(username, password, admin);

    // Hash the user's password
    await user.hashPassword();

    // Add user to the in-memory user data
    addUser(user);

    return user; // Return the newly created user
};

// Function to compare plain password with the hashed password
const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword); // Compare the passwords
};

module.exports = { createUser, comparePassword };
