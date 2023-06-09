import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkAuthenticated = createAsyncThunk();

export const login = createAsyncThunk("user/login", async() => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );
  }
});
