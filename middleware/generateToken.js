require("dotenv").config();
const jwt = require("jsonwebtoken");

// REVIEW: This is not a middleware. You can create a folder called `utils` (utilities) where you can put those types of functions.
exports.generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });
  return token;
};
