const { model, Schema } = require("mongoose");

const TripSchema = Schema(
	{
		title: {
			type: String,
			required: [true, "Title required"],
			maxLength: [20, "Max length for title is 20"],
		},
		description: {
			type: String,
			maxLength: [400, "Max length for description is 400"],
		},
		image: { type: String },
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		comments: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: "User",
					required: true,
					trim: true,
				},
				username: String,
				message: { type: String, required: true },
				dateSent: { type: Date, default: Date.now },
			},
		],
	},
	{ timestamps: true }
);

module.exports = model("Trip", TripSchema);
