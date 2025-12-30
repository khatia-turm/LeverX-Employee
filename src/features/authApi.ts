import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SignInPayload {
  email: string;
  password: string;
}

interface SignUpPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

interface AuthResponse {
  token: string;
  userId: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, SignInPayload>({
      query: (body) => ({
        url: '/sign-in',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    signUp: builder.mutation<AuthResponse, SignUpPayload>({
      query: (body) => ({
        url: '/sign-up',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
