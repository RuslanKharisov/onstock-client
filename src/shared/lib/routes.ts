/**
 * Массив публичных роутов не требующих аутентификации
 */
export const publicRoutes: string[] = [
  "/",
  "/stock",
  "/news",
  "/supplier",
  "/auth/new-verification",
  "/docs",
  "/docs/rules",
  "/docs/policy",
  "/docs/user-agreement",
]
export const privateRoutes: string[] = [
  "/personal-stock",
  "/profile",
  "/prising",
  "/auth/new-verification",
]

/**
 * Массив роутов с доступом для роли Admin
 */
export const adminRoutes: string[] = [
  "/admin/",
]

/**
 * Массив роутов для процесса аутентификации
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/new-password",
  "/auth/error",
]

/**
 * Префикс для API роутов аутентификации
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Роут для редиректа после аутентификации
 */
export const DEFAULT_LOGIN_REDIRECT = "/personal-stock";