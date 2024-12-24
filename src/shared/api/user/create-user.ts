// import axios from 'axios';
// import { Session } from 'next-auth';

// interface CreateUserDto {
//   email: string;
//   name: string;
//   password?: string | null; // Добавлено поле password
//   provider?: string; // Необязательное поле
//   providerAccountId?: string; // Добавлено поле providerAccountId
//   type: string;
//   image?: string | null;
// }

// export const createUserAPI = async (
//   data: CreateUserDto
// ):Promise<Session> => {
//   try {
//     const res = await axios.post(`http://localhost:5000/auth/oauth`, data, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//       console.log("🚀 ~ res.data:", res.data)
//       return  res.data
//   } catch (error) {
//     console.error("🚀 ~ error:", error)
//     throw error
//   }
// };