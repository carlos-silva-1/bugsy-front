import { apiSlice } from './apiSlice';
const USERS_URL = 'api/users';

const backendURL = 'https://bugsy.onrender.com/';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${backendURL}${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${backendURL}${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${backendURL}${USERS_URL}`,
        method: 'POST',
        body: data,
        // header: new Header('Access-Control-Allow-Origin', '*'),
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${backendURL}${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = userApiSlice;
