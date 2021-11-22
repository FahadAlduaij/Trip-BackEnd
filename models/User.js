const { model, Schema } = require("mongoose");

const UserSchema = Schema(
	{
		username: { type: String, require: true, unique: true },
		password: { type: String, require: true },
		profile: {
			firstName: { type: String },
			lastName: { type: String },
			image: String,
			bio: String,
		},
	},
	{ timestamps: true }
);

module.exports = model("User", UserSchema);
