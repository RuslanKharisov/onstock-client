
import { NeedAuthError } from "@/shared/lib/errors";
import { auth } from "./auth";
import authConfig from "./auth.config";

// export const useAppSession = async () => {
//   return await auth()
// }

export const getAppSessionServer = async () => await auth();

export const getAppSessionStrictServer = async () => {
  const session = await auth();
  if (session === null) {
    throw new NeedAuthError();
  }
  return session;
};