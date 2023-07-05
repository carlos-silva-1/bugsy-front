import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import SERVER_URL from '../constants'

const baseQuery = fetchBaseQuery({ baseUrl: SERVER_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Issue'],
  endpoints: (builder) => ({}),
});
