import responseHandler from "../handlers/response.handler.js";
import watchlistModel from "../models/watchlist.model.js";

const addWatchlist = async (req, res) => {
  try {
    const isWatchlist = await watchlistModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId
    });

    if (isWatchlist) return responseHandler.ok(res, isWatchlist);

    const watchlist = new watchlistModel({
      ...req.body,
      user: req.user.id
    });

    await watchlist.save();

    responseHandler.created(res, watchlist);
  } catch {
    responseHandler.error(res);
  }
};

const removeWatchlist = async (req, res) => {
  try {

    const { watchlistId } = req.params;

    const watchlist = await watchlistModel.findOne({
      user: req.user.id,
      _id: watchlistId
    });

    if (!watchlist) return responseHandler.notfound(res);

    await watchlist.deleteOne({_id:watchlistId})

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getWatchlistsOfUser = async (req, res) => {
  try {
    const watchlist = await watchlistModel.find({ user: req.user.id }).sort("-createdAt");

    responseHandler.ok(res, watchlist);
  } catch {
    responseHandler.error(res);
  }
};

export default { addWatchlist, removeWatchlist, getWatchlistsOfUser };