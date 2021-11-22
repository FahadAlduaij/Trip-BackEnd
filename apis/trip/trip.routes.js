const express = require("express");
const {
	findTrip,
	fetchTrips,
	createTrip,
	deleteTrip,
	editTrip,
} = require("./trip.controllers");
const router = express.Router();
const passport = require("passport");

router.param("tripId", async (req, res, next, tripId) => {
	const trip = await findTrip(tripId, next);
	if (trip) {
		req.trip = trip;
		next();
	} else {
		next({
			status: 404,
			message: "Trip not Found",
		});
	}
});

router.get("/", fetchTrips);
router.post("/", passport.authenticate("jwt", { session: false }), createTrip);
router.delete(
	"/:tripId",
	passport.authenticate("jwt", { session: false }),
	deleteTrip
);
router.put(
	"/:tripId",
	passport.authenticate("jwt", { session: false }),
	editTrip
);

module.exports = router;
