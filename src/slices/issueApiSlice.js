import { apiSlice } from './apiSlice';
const ISSUES_URL = 'api/issues';

const backendURL = 'https://bugsy.onrender.com/';

export const issueApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteIssue: builder.mutation({
      query: (id) => ({
        url: `${backendURL}${ISSUES_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
    createIssue: builder.mutation({
      query: (data) => ({
        url: `${backendURL}${ISSUES_URL}/`,
        method: 'POST',
        body: data,
      }),
    }),
    updateIssue: builder.mutation({
      query: (data) => ({
        url: `${backendURL}${ISSUES_URL}/${data._id}`,
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
