import axios from "axios"

interface LoginDto {
  email: string
  password: string
  code?: string
}

export const loginUserAPI = async (data: LoginDto) => {
  try {
    const res = await axios.post(`${process.env.API_URL}/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res.data
  } catch (error) {
    console.error("🚀 ~ error:", error)
    throw error
  }
}

