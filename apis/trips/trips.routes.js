const express = require("express");
const {
  findTrip,
  fetchTrips,
  createTrip,
  deleteTrip,
  editTrip,
} = require("./trips.controllers");
const router = express.Router();
const passport = require("passport");
const upload = require("../../middleware/multer");

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
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createTrip
);
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  deleteTrip
);
// REVIEW: You're not using multer btw
router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  editTrip
);

module.exports = router;
