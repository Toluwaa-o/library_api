const CustomErrors = require("../errors");
const { isTokenValid } = require("../Utils/JWT");

// Middleware to authenticate the user based on the token in the cookies
const auth = async (req, res, next) => {
  const { token } = req.signedCookies; // Get token from signed cookies

  // Check if token is not present in the cookies
  if (!token)
    throw new CustomErrors.UnauthenticatedError("User is unauthenticated!"); // Throw error if no token found

  try {
    const isValid = await isTokenValid(token); // Validate the token using JWT utility
    req.user = { // Attach user data to request object if token is valid
      username: isValid.username,
      admin: isValid.admin,
    };

    next(); // Proceed to the next middleware
  } catch (error) {
    throw new CustomErrors.UnauthenticatedError("Invalid Authentication"); // If token verification fails, throw an error
  }
};

// Middleware to authorize users with admin rights for specific routes
const authorizeUser = (req, res, next) => {
    if (!req.user) { // Check if user object exists in the request
      throw new CustomErrors.UnauthenticatedError("Authentication required"); // Throw error if no user data is present
    }

    if (!req.user.admin) { // Check if user is not an admin
        throw new CustomErrors.UnauthenticatedError("User is not authorized to access this route") // Throw error if the user is not authorized
    }

    // User is authorized, proceed to the next middleware
    next();
};

module.exports = { auth, authorizeUser };
