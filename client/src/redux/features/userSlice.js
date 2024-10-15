import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listWatchlists: []
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token) localStorage.setItem("actkn", action.payload.token);
      }

      state.user = action.payload;
    },
    setListWatchlists: (state, action) => {
      state.listWatchlists = action.payload;
    },
    removeWatchlist: (state, action) => {
      const { mediaId } = action.payload;
      state.listWatchlists = [...state.listWatchlists].filter(e => e.mediaId.toString() !== mediaId.toString());
    },
    addWatchlist: (state, action) => {
      state.listWatchlists = [action.payload, ...state.listWatchlists];
    }
  }
});

export const {
  setUser,
  setListWatchlists,
  addWatchlist,
  removeWatchlist
} = userSlice.actions;

export default userSlice.reducer;