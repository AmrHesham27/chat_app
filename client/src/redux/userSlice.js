import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: null,
    room: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.userName = action.payload;
    },
    logoutUser: (state, action) => {
      state.userName = null;
      state.room = null;
    },
    setRoom: (state, action) => {
      state.room = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
