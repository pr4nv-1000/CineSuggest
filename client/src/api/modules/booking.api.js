import privateClient from "../client/private.client";

const bookingEndpoints = {
  list: "bookings",
  add: "bookings",
  remove: ({ bookingId }) => `bookings/${bookingId}`
};

const bookingApi = {
  add: async ({
    mediaId,
    mediaTitle,
    mediaPoster,
    showtime,
    theater,
    language,
    format,
    bookingDate,
    selectedSeats,
    totalPrice,
  }) => {
    try {
      const response = await privateClient.post(
        bookingEndpoints.add,
        {
          mediaId,
          mediaTitle,
          mediaPoster,
          showtime,
          theater,
          language,
          format,
          bookingDate,
          selectedSeats,
          totalPrice
        }
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  remove: async ({ bookingId }) => {
    try {
      const response = await privateClient.delete(bookingEndpoints.remove({ bookingId }));
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getList: async () => {
    try {
      const response = await privateClient.get(bookingEndpoints.list);
      return { response };
    } catch (err) {
      return { err }; 
    }
  },
};

export default bookingApi;
