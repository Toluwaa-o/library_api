const { UnauthenticatedError, BadRequestError } = require("../errors"); // Import custom error classes
const { createUser, comparePassword } = require("../models/User"); // Import functions for user creation and password comparison
const { addUser, findUserByUsername } = require("../data/UserData"); // Import functions for user management from in-memory storage
const { attachCookies } = require("../Utils/JWT"); // Import function to attach JWT as cookies

// Handles user signup
const signup = async (req, res) => {
    const { username, password, admin } = req.body;

    // Create a new user instance and hash the password
    const newUser = await createUser({ username, password, admin });

    // Attach JWT as cookies to the response
    await attachCookies({
        res,
        user: {
            username: newUser.username,
            admin: newUser.admin
        },
    });

    // Respond with a success message and user details
    return res.status(201).json({
        message: "User created successfully",
        user: {
            username: newUser.username,
            admin: newUser.admin
        }
    })
}

// Handles user signin
const signin = async (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        throw new BadRequestError("Please provide both username and password");
    }

    // Retrieve user by username from the in-memory storage
    const user = findUserByUsername(username);

    // If user doesn't exist, throw error
    if (!user) {
        throw new UnauthenticatedError('Incorrect Credentials');
    }

    // Compare the provided password with the stored hashed password
    const isCorrectPassword = await comparePassword(password, user.password);

    // If password doesn't match, throw error
    if (!isCorrectPassword) {
        throw new UnauthenticatedError('Incorrect Credentials');
    }

    // Attach JWT as cookies to the response
    await attachCookies({
        res,
        user: {
            username: user.username,
            admin: user.admin
        },
    });

    // Respond with a success message and user details
    res.status(200).json({
        message: "User signed in successfully",
        user: {
            username: user.username,
            admin: user.admin
        }
    })
}

// Handles user logout by clearing the token cookie
const logout = async (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true, // Ensures cookie is only accessible by the server
        signed: true, // Ensures the cookie is signed to prevent tampering
        sameSite: "none", // Allows cookie to be sent with cross-origin requests
        secure: process.env.NODE_ENV === "production", // Ensures cookie is only sent over HTTPS in production
        expires: new Date(Date.now()), // Immediately expires the cookie
    });

    // Respond with a success message
    res.status(200).json({ msg: "Logged out " });
};

module.exports = { signup, signin, logout };
