import express from "express";
import userRoute from "./user.route.js";
import mediaRoute from "./media.route.js";
import personRoute from "./person.route.js";
import reviewRoute from "./review.route.js";
import bookingRoute from "./booking.route.js"

const router = express.Router();

router.use("/user", userRoute);
router.use("/person", personRoute);
router.use("/reviews", reviewRoute);
router.use("/:mediaType", mediaRoute);
router.use("/bookings", bookingRoute);

export default router;