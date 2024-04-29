import { cookies } from "next/headers";

export async function getSession() {
    const sessionData = cookies().get('session')
    return sessionData ? (sessionData) : null
  }

  export async function getAuthToken() {
    const authToken = cookies().get("session")?.value;
    return authToken;
  }  