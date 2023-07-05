import { apiSlice } from './apiSlice';
import SERVER_URL from '../constants'

const ISSUES_URL = 'api/issues';

export const issueApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteIssue: builder.mutation({
      query: (id) => ({
        url: `${SERVER_URL}${ISSUES_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
    createIssue: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}${ISSUES_URL}/`,
        method: 'POST',
        body: data,
      }),
    }),
    updateIssue: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}${ISSUES_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useDeleteIssueMutation,
  useCreateIssueMutation,
  useUpdateIssueMutation,
} = issueApiSlice;
