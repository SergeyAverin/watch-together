import { type BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "@utils/cookie";

const BASE_URL = process.env.API_BASE_URL;

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getCookie("jwt");

    if (token !== null) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
