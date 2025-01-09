const jwt = require("jsonwebtoken"); // Import the JSON Web Token (JWT) library

// Generates a JWT token for a given user payload with a defined expiration time.
const createJWT = async (tokenUser) => {
  const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

// Validates the given JWT token using the secret key.
const isTokenValid = async (token) => jwt.verify(token, process.env.JWT_SECRET);

// Creates a JWT token for the user and attaches it as a cookie to the response.
// The cookie is configured with security options and an expiration time of one day.
const attachCookies = async ({ res, user }) => {
  const token = await createJWT(user);
  const aDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true, // Ensures the cookie is only accessible by the server.
    expires: new Date(Date.now() + aDay), // Sets cookie expiration to one day.
    secure: process.env.NODE_ENV === "production", // Activates secure cookies in production.
    signed: true, // Signs the cookie to detect tampering.
    sameSite: "none", // Allows the cookie to be sent with cross-origin requests.
  });
};

module.exports = { attachCookies, isTokenValid };
