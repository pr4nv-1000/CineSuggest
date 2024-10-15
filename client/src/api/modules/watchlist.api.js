import privateClient from "../client/private.client";

const watchlistEndpoints = {
  list: "user/watchlists",
  add: "user/watchlists",
  remove: ({ watchlistId }) => `user/watchlists/${watchlistId}`
};

const watchlistApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(watchlistEndpoints.list);

      return { response };
    } catch (err) { return { err }; }
  },
  add: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    mediaRate
  }) => {
    try {
      const response = await privateClient.post(
        watchlistEndpoints.add,
        {
          mediaId,
          mediaType,
          mediaTitle,
          mediaPoster,
          mediaRate
        }
      );

      return { response };
    } catch (err) { return { err }; }
  },
  remove: async ({ watchlistId }) => {
    try {
      const response = await privateClient.delete(watchlistEndpoints.remove({ watchlistId }));

      return { response };
    } catch (err) { return { err }; }
  }
};

export default watchlistApi;