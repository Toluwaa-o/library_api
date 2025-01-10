require('dotenv').config() // Load environment variables from a .env file
require('express-async-errors') // Enable async error handling for Express

const cookieParser = require('cookie-parser') // Middleware to parse cookies
const express = require('express'); // Import Express framework
const morgan = require('morgan') // Middleware for logging HTTP requests
const cors = require('cors') // Middleware to handle Cross-Origin Resource Sharing (CORS)
const helmet = require('helmet') // Middleware for setting HTTP headers for security

const authRouter = require('./routes/AuthRoutes') // Router for authentication routes
const bookRouter = require('./routes/BookRoutes') // Router for book-related routes

const app = express(); // Create an Express application

// Security middleware configuration
app.set('trust proxy', 1) // Enable proxy support (useful when behind a proxy like NGINX)
app.use(cors({
    origin: true, // Allow requests from any origin
    credentials: true // Enable cookies and credentials sharing
}))
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin resource sharing for assets
    crossOriginEmbedderPolicy: false // Disable cross-origin embedder policy
}))

// Middleware imports
const notFound = require('./middleware/not-found') // Middleware for handling 404 errors
const errorHandler = require('./middleware/error-handler'); // Middleware for handling application errors
const { auth } = require('./middleware/authentication'); // Middleware for user authentication

// General middleware invocation
app.use(express.json()) // Parse incoming JSON requests
app.use(express.static('./public')) // Serve static files from the "Public" directory
app.use(cookieParser(process.env.JWT_SECRET)) // Parse and sign cookies using the JWT secret
app.use(morgan('tiny')) // Log HTTP requests in a concise format

// Route handling
app.get('/', (req, res) => res.redirect('https://documenter.getpostman.com/view/26898944/2sAYQUquYC'))
app.use('/auth', authRouter) // Routes for authentication (e.g., login, signup)
app.use('/books', auth, bookRouter) // Protected routes for books (requires authentication)

// Error handling middleware
app.use(notFound) // Middleware for handling routes not found (404)
app.use(errorHandler) // Middleware for handling application errors

// Start the server
const PORT = process.env.PORT || 3000; // Use the PORT from .env or default to 3000
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT); // Log the server's running port
});
