const { model, Schema } = require("mongoose");

const TripSchema = Schema(
	{
		title: {
			type: String,
			required: [true, "Title required"],
			minLength: [2, "Min length for title is 2"],
			maxLength: [20, "Max length for title is 20"],
		},
		description: {
			type: String,
			minLength: [2, "Min length for description is 2"],
			maxLength: [400, "Max length for description is 400"],
		},
		image: { type: String },
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = model("Trip", TripSchema);
