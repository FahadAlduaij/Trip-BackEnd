const { model, Schema } = require("mongoose");

const TripSchema = Schema(
	{
		title: { type: String, require: true },
		description: { type: String },
		image: { type: String },
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = model("Trip", TripSchema);
