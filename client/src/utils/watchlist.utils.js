const watchlistUtils = {
  check: ({ listWatchlists, mediaId }) => listWatchlists && listWatchlists.find(e => e.mediaId.toString() === mediaId.toString()) !== undefined
};

export default watchlistUtils;