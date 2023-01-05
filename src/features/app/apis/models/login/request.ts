/**
 * POST /login リクエスト
 */
export type LoginRequest = {
  loginId: string
  password: string
  tenantAlias: string
}
