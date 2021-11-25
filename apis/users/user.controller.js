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

exports.updateProfile = async (req, res, next) => {
	try {
		if (!req.user._id.equals(req.user._id)) {
			return next({ status: 401, message: "Not the Owner" });
		}

		if (req.file) {
			req.body.image = `/media/${req.file.filename}`;
			req.body.image = req.body.image.replace("\\", "/");
		}

		const profile = await User.findByIdAndUpdate(req.user, req.body, {
			new: true,
			runValidators: true,
		});
		return res.status(200).json(profile);
	} catch (error) {
		next(error);
	}
};
