import responseHandler from "../handlers/response.handler.js";
import bookingModel from "../models/booking.model.js";

const create = async (req, res) => {
  try {
    const { movieId } = req.params;

    const booking = new bookingModel({
      user: req.user.id,          
      mediaId: movieId,           
      ...req.body                 
    });


    await booking.save();

    responseHandler.created(res, {
      ...booking._doc,
      id: booking.id,          
      user: req.user,          
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await bookingModel.findOne({
      _id: bookingId,
      user: req.user.id
    });

    if (!booking) return responseHandler.notfound(res);

    await booking.deleteOne({ _id: bookingId });

    responseHandler.ok(res);
  } catch (error) {
    responseHandler.error(res);
  }
};

const getBookingsOfUser = async (req, res) => {
  try {
    const bookings = await bookingModel.find({
      user: req.user.id
    }).sort("-createdAt");

    responseHandler.ok(res, bookings);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default { create, remove, getBookingsOfUser };
