import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: process.env.SERVER_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Issue'],
  endpoints: (builder) => ({}),
});
