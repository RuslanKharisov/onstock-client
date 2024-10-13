import { auth } from "./auth";

export async function getAppSessionServer () {
    return  await auth()
} 