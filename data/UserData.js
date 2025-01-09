const users = []; // In-memory array to store user objects

// Adds a new user object to the users array
const addUser = (user) => users.push(user);

// Finds a user in the users array by their username
const findUserByUsername = (username) => {
    return users.find((u) => u.username === username); // Return the user object that matches the username
};

// Returns the total number of users in the array
const getUserCount = () => users.length;

module.exports = {
    addUser,
    findUserByUsername,
    getUserCount
};
