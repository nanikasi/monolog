import type { AppLoadContext } from "@remix-run/cloudflare";
import { GoogleStrategy } from "remix-auth-google";
import { type AuthType, authenticator } from "./auth.server";
import { getEnv } from "./contextEnv";

let googleStrategy: GoogleStrategy<AuthType> | null = null;

const initGoogleAuthenticator = (context: AppLoadContext) => {
  if (googleStrategy) {
    return authenticator;
  }

  const CLIENT_URL = context.cloudflare.env.CLIENT_URL;
  const SERVER_URL = context.cloudflare.env.SERVER_URL;
  const GOOGLE_CLIENT_ID = context.cloudflare.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = context.cloudflare.env.GOOGLE_CLIENT_SECRET;

  if (!CLIENT_URL) {
    throw new Error("CLIENT_URL is not set");
  }
  if (!SERVER_URL) {
    throw new Error("SERVER_URL is not set");
  }
  if (!GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not set");
  }
  if (!GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_SECRET is not set");
  }

  googleStrategy = new GoogleStrategy<AuthType>(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${CLIENT_URL}/api/auth/google/callback`,
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
      const response = await fetch(`${SERVER_URL}/api/user-id/${profile.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${extraParams.idToken}`,
        },
      });

      if (!response.ok) {
      }

      return {
        id: profile.id,
        idToken: extraParams.id_token,
      };
    },
  );
  const env = getEnv(context);
  authenticator(env).use(googleStrategy);
  return authenticator(env);
};

export default initGoogleAuthenticator;
