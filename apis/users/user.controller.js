const User = require("../../models/User");
const { generateToken } = require("../../middleware/generateToken");
const { createHash } = require("../../middleware/createHash");

// REVIEW: btw, why do you need the list of users?
exports.fetchUsers = async (req, res, next) => {
  try {
    // REVIEW: make sure you remove the password and not return them in the response
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    // REVIEW: Remove console logs
    req.body.password = await createHash(req.body.password);
    console.log(req.body);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res) => {
  const token = generateToken(req.user);
  res.json({ token });
};
