import { apis } from 'apis/apis'
import { LoginRequest } from './models/login/request'
import { LoginResponse } from './models/login/response'

const authApis = apis.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (params) => ({
        url: 'login',
        method: 'POST',
        body: params,
      }),
    }),

    getLogin: builder.query<void, void>({
      query: () => ({
        url: 'login',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useGetLoginQuery, useLazyGetLoginQuery } =
  authApis
