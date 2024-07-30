/**
 * Массив публичных роутов не требующих аутентификации
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/stock",
  "/news",
  "/auth/new-verification",
]

/**
 * Массив роутов с доступом для роли Admin
 * @type {string[]}
 */
export const adminRoutes: string[] = [
  "/settings",
]



/**
 * Массив роутов для процесса аутентификации
 * @type {string[]}
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
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * Роут для редиректа после аутентификации
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/personal-stock";