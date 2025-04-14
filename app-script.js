// Конфигурация API
const API_CONFIG = {
  SECRET_TOKEN: "your_secure_token_here", // ЗАМЕНИТЕ НА РЕАЛЬНЫЙ СЕКРЕТНЫЙ ТОКЕН
  DEFAULT_PER_PAGE: 10,
  MAX_PER_PAGE: 100,
  CACHE_DURATION: 300, // 5 минут в секундах
}

/**
 * Тестовая функция для проверки API
 * Запускается вручную из редактора скриптов
 */
function testDoGet() {
  console.log("testDoGet")
  const mockRequest = {
    parameter: {
      page: "1",
      per_page: "10",
      filters: JSON.stringify({
        sku: "",
        description: "электродвигателя",
        category: "",
      }),
      sort_by: "experience",
      sort_order: "desc",
      token: API_CONFIG.SECRET_TOKEN, // Используем токен из конфига
    },
  }

  const result = doGet(mockRequest)
  Logger.log("Результат теста:\n" + result.getContent())
  return result
}

/**
 * Основная функция обработки GET-запросов
 * @param {Object} e - Объект запроса
 */
function doGet(e) {
  // Инициализация объекта запроса если он не передан
  e = e || {}
  e.parameter = e.parameter || {}

  try {
    // 1. ПРОВЕРКА ТОКЕНА (основная причина вашей ошибки)
    console.log(API_CONFIG.SECRET_TOKEN)
    console.log("e.parameter.token:", e.parameter.token)
    const requestToken = e.parameter.token
    if (!e.parameter.token || e.parameter.token !== API_CONFIG.SECRET_TOKEN) {
      throw new Error(
        `Неверный токен доступа. Ожидается: ${API_CONFIG.SECRET_TOKEN}. Получено: ${e.parameter.token || "не указано"}`,
      )
    }

    // 2. ПОЛУЧЕНИЕ ДАННЫХ ИЗ ТАБЛИЦЫ
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    const [headers, ...rows] = sheet.getDataRange().getValues()

    // 3. ПОДГОТОВКА ДАННЫХ
    const formattedHeaders = headers.map((h) =>
      h.toString().toLowerCase().replace(/\s+/g, "_"),
    )

    // 4. ПАРСИНГ ПАРАМЕТРОВ ЗАПРОСА
    const params = parseRequestParameters(e.parameter)

    // 5. ФИЛЬТРАЦИЯ И СОРТИРОВКА
    let processedData = processData(rows, formattedHeaders, params)

    // 6. ПАГИНАЦИЯ
    const paginatedData = applyPagination(processedData, params)

    // 7. ФОРМИРОВАНИЕ ОТВЕТА
    const response = buildResponse(paginatedData, processedData.length, params)

    // 8. КЭШИРОВАНИЕ И ВОЗВРАТ РЕЗУЛЬТАТА
    return cacheAndReturnResponse(response, e.parameter)
  } catch (error) {
    // ОБРАБОТКА ОШИБОК
    Logger.log(`Ошибка API: ${error.message}\n${error.stack}`)
    return buildErrorResponse(error.message, 401)
  }
}

//=== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===//

/** Парсит параметры запроса */
function parseRequestParameters(params) {
  return {
    page: Math.max(1, parseInt(params.page) || 1),
    per_page: Math.min(
      API_CONFIG.MAX_PER_PAGE,
      Math.max(1, parseInt(params.per_page) || API_CONFIG.DEFAULT_PER_PAGE),
    ),
    sort_by: params.sort_by,
    sort_order: params.sort_order === "desc" ? "desc" : "asc",
    filters: safeJsonParse(params.filters),
    token: params.token,
  }
}

/** Обрабатывает данные (фильтрация и сортировка) */
function processData(rows, headers, params) {
  // Преобразование строк в объекты
  let items = rows.map((row) => {
    return headers.reduce((obj, header, i) => {
      obj[header] = row[i]
      return obj
    }, {})
  })

  // Фильтрация
  if (params.filters) {
    items = items.filter((item) =>
      Object.entries(params.filters).every(([key, val]) =>
        String(item[key]).toLowerCase().includes(String(val).toLowerCase()),
      ),
    )
  }

  // Сортировка
  if (params.sort_by && headers.includes(params.sort_by)) {
    items.sort((a, b) => {
      const compareResult = compareValues(a[params.sort_by], b[params.sort_by])
      return params.sort_order === "desc" ? -compareResult : compareResult
    })
  }

  return items
}

/** Применяет пагинацию */
function applyPagination(items, params) {
  const startIdx = (params.page - 1) * params.per_page
  return items.slice(startIdx, startIdx + params.per_page)
}

/** Формирует ответ API */
function buildResponse(data, totalItems, params) {
  return {
    meta: {
      page: params.page,
      per_page: params.per_page,
      total_items: totalItems,
      total_pages: Math.ceil(totalItems / params.per_page),
      sort_by: params.sort_by,
      sort_order: params.sort_order,
      filters: params.filters,
    },
    data: data,
  }
}

/** Работа с кэшем */
function cacheAndReturnResponse(response, params) {
  const cacheKey = JSON.stringify(params)
  const cached = CacheService.getScriptCache().get(cacheKey)

  if (cached) {
    Logger.log("Используем данные из кэша")
    return buildJsonResponse(cached)
  }

  const jsonResponse = JSON.stringify(response)
  CacheService.getScriptCache().put(
    cacheKey,
    jsonResponse,
    API_CONFIG.CACHE_DURATION,
  )

  return buildJsonResponse(jsonResponse)
}

/** Сравнение значений для сортировки */
function compareValues(a, b) {
  if (a === b) return 0
  return a < b ? -1 : 1
}

/** Безопасный парсинг JSON */
function safeJsonParse(str) {
  try {
    return str ? JSON.parse(str) : null
  } catch (e) {
    Logger.log(`Ошибка парсинга JSON: ${str}`)
    return null
  }
}

/** Формирует JSON-ответ */
function buildJsonResponse(data) {
  return ContentService.createTextOutput(data).setMimeType(
    ContentService.MimeType.JSON,
  )
}

/** Формирует ответ с ошибкой */
function buildErrorResponse(message, status) {
  return buildJsonResponse(
    JSON.stringify({
      error: true,
      message: message,
      status: status,
    }),
  )
}
