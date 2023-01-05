/**
 * POST /login レスポンス
 */
export type LoginResponse = { data: User }

/**
 * User型
 */
export type User = {
  id: string
  accountId: string
  displayName: string
  avatarUrl: string | null
  createdById: string
  createdAt: string
  updatedById: string
  updatedAt: string
  version: number
}
