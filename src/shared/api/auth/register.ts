import axios from "axios"

interface RegisterDto {
  email: string
  password: string
  name: string
  type: string | null
}

console.log(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`)

export const registerUserAPI = async (data: RegisterDto) => {
  try {
    const res = await axios.post(`${process.env.API_URL}/auth/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.data.success) {
      return res.data.success
    } else {
      return res.data.error
    }
  } catch (error) {
    console.error("error:", error)
    throw error
  }
}
