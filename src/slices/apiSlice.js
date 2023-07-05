import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const SERVER_URL = 'https://bugsy.onrender.com/';
const baseQuery = fetchBaseQuery({ baseUrl: SERVER_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Issue'],
  endpoints: (builder) => ({}),
});
