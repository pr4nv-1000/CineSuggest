import express from "express";
import { body } from "express-validator";
import bookingController from "../controllers/booking.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  tokenMiddleware.auth,
  bookingController.getBookingsOfUser
);

router.post(
  "/",
  tokenMiddleware.auth,
  body("mediaId")
    .exists().withMessage("mediaId is required")
    .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
  body("mediaTitle")
    .exists().withMessage("mediaTitle is required"),
  body("mediaPoster")
    .exists().withMessage("mediaPoster is required"),
  body("showtime")
    .exists().withMessage("showtime is required"),
  body("theater")
    .exists().withMessage("theater is required"),
  body("language")
    .exists().withMessage("language is required"),
  body("format")
    .exists().withMessage("format is required"),  
  body("bookingDate")
    .exists().withMessage("bookingDate is required"),
  body("selectedSeats")
    .exists().withMessage("selectedSeats is required"),
  body("totalPrice")
    .exists().withMessage("totalPrice is required"),
  requestHandler.validate,
  bookingController.create
);

router.delete(
  "/:bookingId",
  tokenMiddleware.auth,
  bookingController.remove
);

export default router;