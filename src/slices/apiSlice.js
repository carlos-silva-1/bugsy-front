import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://bugsy.onrender.com/' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Issue'],
  endpoints: (builder) => ({}),
});
