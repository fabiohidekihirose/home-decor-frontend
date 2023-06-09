import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default slice.reducer;
