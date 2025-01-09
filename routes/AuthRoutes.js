const express = require('express') // Import Express for routing
const router = express.Router() // Create a new router instance

// Import controller functions for signup, signin, and logout
const { signup, signin, logout } = require('../controllers/AuthControllers')


router.route('/register').post(signup) // POST route to register a user
router.route('/login').post(signin) // POST route to login a user
router.route('/logout').get(logout) // GET route to log out a user

module.exports = router
