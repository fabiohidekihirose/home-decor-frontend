import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../slicers/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithAuth = async (
  args: any,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("Sending refresh token");
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setCredentials({ ...refreshResult, user }));
    } else {
      api.dispatch(logOut({}));
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({}),
});
