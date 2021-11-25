require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
		name: user.name,
		image: user.image,
		bio: user.bio,
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "365d",
	});
	return token;
};
