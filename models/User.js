const { model, Schema } = require("mongoose");

const UserSchema = Schema(
	{
		username: {
			type: String,
			required: [true, "Username required"],
			unique: true,
			minLength: [1, "Min length for username is 2"],
			maxLength: [30, "Max length for username is 20"],
		},
		password: {
			type: String,
			required: [true, "Password required"],
			minLength: [5, "Min length for username is 2"],
			maxLength: [30, "Max length for username is 20"],
		},
		email: { type: String, required: [true, "Email required"] },
		name: {
			type: String,
			required: [true, "Name required"],
			minLength: [2, "Min length for name is 2"],
			maxLength: [20, "Max length for name is 20"],
		},
		profile: {
			image: String,
			bio: {
				type: String,
				minLength: [2, "Min length for bio is 2"],
				maxLength: [100, "Max length for bio is 20"],
			},
		},
	},
	{ timestamps: true }
);

module.exports = model("User", UserSchema);
