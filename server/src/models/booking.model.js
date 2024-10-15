import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Booking",
  mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    mediaId: {
      type: String,
      required: true
    },
    mediaTitle: {
      type: String,
      required: true
    },
    mediaPoster: {
      type: String,
      required: true
    },
    showtime: {
      type: String,
      required: true,
    },
    theater: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    language:{
      type: String,
      required: true,
    },
    format:{
      type: String,
      required: true,
    },
    selectedSeats:{
      type: Array,
      required: true,
    },
    totalPrice:{
      type: String,
      required: true,
    }
  }, modelOptions)
);
