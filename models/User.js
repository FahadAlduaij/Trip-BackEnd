const { model, Schema } = require("mongoose");

const UserSchema = Schema(
	{
		username: {
			type: String,
			required: [true, "Username required"],
			unique: true,
			maxLength: [30, "Max length for username is 30"],
		},
		password: {
			type: String,
			required: [true, "Password required"],
			maxLength: [50, "Max length for password is 50"],
		},
		email: { type: String, required: [true, "Email required"] },
		name: {
			type: String,
			required: [true, "Name required"],
			maxLength: [20, "Max length for name is 20"],
		},

		image: String,
		bio: {
			type: String,
			maxLength: [100, "Max length for bio is 100"],
		},
	},
	{ timestamps: true }
);

module.exports = model("User", UserSchema);
