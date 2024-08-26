import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";

export type AuthType = {
  id: string;
  idToken: string;
};

let cachedAuthenticator: Authenticator<AuthType> | null = null;

export const authenticator = (env: Env) => {
  if (!cachedAuthenticator) {
    cachedAuthenticator = new Authenticator<AuthType>(sessionStorage(env));
  }
  return cachedAuthenticator;
};
