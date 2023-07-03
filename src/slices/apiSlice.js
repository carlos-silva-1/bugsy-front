import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'http://bugsy.eba-rjbpkehi.us-east-2.elasticbeanstalk.com/' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Issue'],
  endpoints: (builder) => ({}),
});
