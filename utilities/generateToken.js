require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
	const payload = {
		_id: user._id,
		username: user.username,
		name: user.name,
		profile: user.profile,
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "365d",
	});
	return token;
};
