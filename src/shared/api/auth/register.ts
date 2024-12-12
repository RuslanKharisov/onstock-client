import axios from 'axios';

interface RegisterDto {
    email: string
    password: string
    name: string
    type: string | null
}

export const registerUserAPI = async (
  data: RegisterDto
) => {  
  console.log("🚀 ~ data:", data)
  try {
    const res = await axios.post(`http://localhost:5000/auth/register`, data);
    if (res.data.success) {
      return  res.data.success 
    } else {
      return  res.data.error ;
    }    
  } catch (error) {
    console.error("error:", error)
    // throw error
  }
};