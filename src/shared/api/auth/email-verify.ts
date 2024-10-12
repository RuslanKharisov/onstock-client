import axios from "axios"

export const emailVerifyApi = async (token: string) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/auth/verify-email?token=${token}`
    );
    return res.data; // возвращаем весь объект данных
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};
