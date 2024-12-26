const API_URL = process.env.NEXT_PUBLIC_API_URL as string
console.log("🚀 ~ API_URL:", API_URL)

export class ApiClient {
  private baseUrl: string

  constructor(url: string) {
    this.baseUrl = url
  }
  
  async handleResponse<TResult>(response: Response): Promise<TResult> {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    try {
      return await response.json()
    } catch (error) {
      throw new Error("Error parsing JSON response")
    }
  }
  
  public async get<TResult = unknown>(
    endpoint: string,
    queryParams?: Record<string, string | number>,
  ): Promise<TResult> {
    const url = new URL(endpoint, this.baseUrl)
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString())
      })
    }
    
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    
    return this.handleResponse<TResult>(response)
  }
  
  public async post<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData,
    token?: string,
    tokenType: 'Bearer' | 'Refresh' = 'Bearer',  // Добавляем тип токена с значением по умолчанию
  ): Promise<TResult> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }
    console.log("🚀 ~ ApiClient ~ this.baseUrl:", this.baseUrl)

    if (token) {
      headers["Authorization"] = `${tokenType} ${token}`  // Используем переданный тип токена
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })

    return this.handleResponse<TResult>(response)
  }

  public async delete<TResult = unknown>(
    endpoint: string,
    accessToken?: string,
  ): Promise<TResult> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers,
    })

    return this.handleResponse<TResult>(response)
  }


  public async patch<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData,
    accessToken?: string,
  ): Promise<TResult> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });

    return this.handleResponse<TResult>(response);
  }
}

export const apiClient = new ApiClient(API_URL)