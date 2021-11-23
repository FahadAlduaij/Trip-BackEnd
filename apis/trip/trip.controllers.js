const Trip = require("../../models/Trip");

// Check the tripId
exports.findTrip = async (tripId, next) => {
	try {
		const trip = await Trip.findById(tripId);
		return trip;
	} catch (error) {
		next(error);
	}
};

exports.fetchTrips = async (req, res, next) => {
	try {
		const trips = await Trip.find().populate({
			path: "owner",
			select: "-password",
		});
		res.status(200).json(trips);
	} catch (error) {
		next(error);
	}
};

exports.createTrip = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.image = `/media/${req.file.filename}`;
		}

		req.body.owner = req.user._id;
		const newTrip = await Trip.create(req.body);
		await newTrip.populate({
			path: "owner",
			select: "-password",
		});
		return res.status(201).json(newTrip);
	} catch (error) {
		next(error);
	}
};

exports.deleteTrip = async (req, res, next) => {
	try {
		if (!req.user._id.equals(req.trip.owner)) {
			return next({ status: 401, message: "Not the Owner" });
		}
		await Trip.deleteOne(req.trip._id);
		res.status(204).end();
	} catch (error) {
		next(error);
	}
};

exports.editTrip = async (req, res, next) => {
	try {
		if (!req.user._id.equals(req.trip.owner)) {
			return next({ status: 401, message: "Not the Owner" });
		}

		if (req.file) {
			req.body.image = `/media/${req.file.filename}`;
		}

		req.body.owner = req.user._id;
		const trip = await Trip.findByIdAndUpdate(req.trip, req.body, {
			new: true,
			runValidators: true,
		}).populate({
			path: "owner",
			select: "-password",
		});
		return res.status(200).json(trip);
	} catch (error) {
		next(error);
	}
};
