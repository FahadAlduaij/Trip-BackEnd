const User = require("../../models/User");
const { generateToken } = require("../../middleware/generateToken");
const { createHash } = require("../../middleware/createHash");

exports.fetchUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

exports.signup = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.image = `/media/${req.file.filename}`;
		}
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
