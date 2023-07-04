import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://bugsy-backend-7bwr0rmbu-carlos-silva-1.vercel.app/' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Issue'],
  endpoints: (builder) => ({}),
});
