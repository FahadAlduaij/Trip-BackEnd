const User = require("../../models/User");
const { generateToken } = require("../../middleware/generateToken");
const { createHash } = require("../../middleware/createHash");

exports.signup = async (req, res, next) => {
  try {
    req.body.password = await createHash(req.body.password);
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
