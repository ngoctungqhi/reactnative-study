import { apis, commonApis } from '../apiBase/apiBase'
import { AuthorizeCommonRequestAuthzProtectedAccessTokenRequest } from './models/authorizeCommonRequestAuthzProtectedAccessToken/request'
import { CheckDuplicateLoginIdRequest } from './models/checkDuplicateLoginId/request'
import { CheckDuplicateLoginIdResponse } from './models/checkDuplicateLoginId/response'
import { CheckDuplicateTenantIdRequest } from './models/checkDuplicateTenantId/request'
import { CheckDuplicateTenantIdResponse } from './models/checkDuplicateTenantId/response'
import { GetCommonRequestAuthzProtectedAccessTokenResponse } from './models/getCommonRequestAuthzProtectedAccessToken/response'
import { GetUserPendingRequest } from './models/getUserPending/request'
import { GetUserPendingResponse } from './models/getUserPending/response'
import { LoginRequest } from './models/login/request'
import { LoginResponse } from './models/login/response'
import { NewUserJoinTenantRequest } from './models/newUserJoinTenant/request'
import { NewUserJoinTenantResponse } from './models/newUserJoinTenant/response'
import { ReCaptchaVerifyRequest } from './models/reCaptchaVerify/request'
import { ReCaptchaVerifyResponse } from './models/reCaptchaVerify/response'
import { RefreshRequest } from './models/refresh/request'
import { AccountRegistrationRequest } from './models/requestAccountRegistration/request'
import { ResetPasswordRequest } from './models/resetPassword/request'
import { SignupRequest } from './models/signup/request'
import { SignupResponse } from './models/signup/response'
import { AuthenticationCodeRequest } from './models/twoFactorAuth/request'
import { AuthenticationCodeResponse } from './models/twoFactorAuth/response'
import { UpdatePasswordRequest } from './models/updatePassword/request'
import { VerifyTokenExpirationTimeRequest } from './models/verifyTokenExpirationTime/request'
import { VerifyTokenExpirationTimeResponse } from './models/verifyTokenExpirationTime/response'
import { VerifyUserPendingsRequest } from './models/verifyUserPendings/request'
import { VerifyUserPendingsResponse } from './models/verifyUserPendings/response'

// 認証API(テナント用)
const authApis = apis.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (params) => ({
        url: 'login',
        method: 'POST',
        body: params,
      }),
    }),

    twoFactorAuth: builder.mutation<
      AuthenticationCodeResponse,
      AuthenticationCodeRequest
    >({
      query: (params) => ({
        url: 'two-factor-auth',
        method: 'POST',
        body: params,
      }),
    }),

    getRefresh: builder.query<void, RefreshRequest>({
      query: (params) => ({
        url: 'refresh',
        method: 'GET',
        params,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),

    requestAccountRegistration: builder.mutation<
      void,
      AccountRegistrationRequest
    >({
      query: (params) => ({
        url: 'account/request',
        method: 'POST',
        body: params,
      }),
    }),

    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (params) => ({
        url: 'signup/register',
        method: 'POST',
        body: params,
      }),
    }),

    checkDuplicateTenantId: builder.query<
      CheckDuplicateTenantIdResponse,
      CheckDuplicateTenantIdRequest
    >({
      query: (params) => ({
        url: `check-duplicate-tenant-id`,
        method: 'GET',
        params: params,
      }),
    }),

    checkDuplicateLoginId: builder.query<
      CheckDuplicateLoginIdResponse,
      CheckDuplicateLoginIdRequest
    >({
      query: (params) => ({
        url: `check-duplicate-login-id`,
        method: 'GET',
        params: params,
      }),
    }),

    getUserPending: builder.query<
      GetUserPendingResponse,
      GetUserPendingRequest
    >({
      query: (params) => ({
        url: `user-pendings`,
        method: 'GET',
        params: params,
      }),
    }),

    newUserJoinTenant: builder.mutation<
      NewUserJoinTenantResponse,
      NewUserJoinTenantRequest
    >({
      query: (params) => ({
        url: 'user-pendings/join',
        method: 'POST',
        body: params,
      }),
    }),

    reCaptchaVerify: builder.mutation<
      ReCaptchaVerifyResponse,
      ReCaptchaVerifyRequest
    >({
      query: (params) => ({
        url: 'recaptcha/verify',
        method: 'POST',
        body: params,
      }),
    }),

    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: (params) => ({
        url: 'reset-password',
        method: 'POST',
        body: params,
      }),
    }),

    updatePassword: builder.mutation<void, UpdatePasswordRequest>({
      query: (params) => ({
        url: 'update-password',
        method: 'POST',
        body: params,
      }),
    }),

    verifyUserPendings: builder.mutation<
      VerifyUserPendingsResponse,
      VerifyUserPendingsRequest
    >({
      query: (params) => ({
        url: 'user-pendings/insert/verify',
        method: 'POST',
        body: params,
      }),
    }),

    GetCommonRequestAuthzProtectedAccessToken: builder.query<
      GetCommonRequestAuthzProtectedAccessTokenResponse,
      void
    >({
      query: () => ({
        url: 'common-request-authz-protected-access-token',
        method: 'GET',
      }),
    }),

    verifyTokenExpirationTime: builder.query<
      VerifyTokenExpirationTimeResponse,
      VerifyTokenExpirationTimeRequest
    >({
      query: (params) => ({
        url: 'signup/verify-token-expiration-time',
        method: 'GET',
        params: params,
      }),
    }),
  }),
  overrideExisting: false,
})

// 認証API(共通API用)
const authCommonApis = commonApis.injectEndpoints({
  endpoints: (builder) => ({
    AuthorizeCommonRequestAuthzProtectedAccessToken: builder.mutation<
      void,
      AuthorizeCommonRequestAuthzProtectedAccessTokenRequest
    >({
      query: (params) => ({
        url: 'authorize-common-request-authz-protected-access-token',
        method: 'POST',
        body: params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useLoginMutation,
  useTwoFactorAuthMutation,
  useLogoutMutation,
  useRequestAccountRegistrationMutation,
  useLazyGetRefreshQuery,
  useSignupMutation,
  useCheckDuplicateTenantIdQuery,
  useLazyCheckDuplicateTenantIdQuery,
  useLazyCheckDuplicateLoginIdQuery,
  useGetUserPendingQuery,
  useNewUserJoinTenantMutation,
  useReCaptchaVerifyMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useVerifyUserPendingsMutation,
  useGetCommonRequestAuthzProtectedAccessTokenQuery,
  useLazyGetCommonRequestAuthzProtectedAccessTokenQuery,
  useVerifyTokenExpirationTimeQuery,
  useLazyVerifyTokenExpirationTimeQuery,
} = authApis

export const { useAuthorizeCommonRequestAuthzProtectedAccessTokenMutation } =
  authCommonApis
