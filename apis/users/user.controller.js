const User = require("../../models/User");
const { generateToken } = require("../../utilities/generateToken");
const { createHash } = require("../../utilities/createHash");

exports.signup = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.image = `/media/${req.file.filename}`;
			req.body.image = req.body.image.replace("\\", "/");
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
