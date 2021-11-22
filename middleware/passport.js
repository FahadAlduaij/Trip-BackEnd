require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");

// models
const User = require("../models/User");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
	try {
		const user = await User.findOne({ username: username });

		const passwordMatch = user
			? await bcrypt.compare(password, user.password)
			: false;

		if (passwordMatch) return done(null, user);
		return done(null, false);
	} catch (error) {
		done(error);
	}
});

exports.jwtStrategy = new JWTStrategy(
	{
		jwtFromRequest: fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET,
	},
	async (payload, done) => {
		if (Date.now() > payload.exp * 1000) {
			return done(null, false);
		}
		try {
			const user = await User.findById(payload._id);
			return done(null, user);
		} catch (error) {
			done(error);
		}
	}
);
