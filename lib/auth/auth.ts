import { APIError, betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { nextCookies } from 'better-auth/next-js';
import { createAuthMiddleware } from 'better-auth/api';
import { admin } from 'better-auth/plugins';

const client = new MongoClient(process.env.DATABASE_URL!);
const db = client.db();

export const auth = betterAuth({
  user: {
    additionalFields: {
      formCompleted: {
        type: "boolean",
      }
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  // hooks: {
  //   before: createAuthMiddleware(async (ctx) => {
  //     if (!ctx.path.includes("/callback/:id")) {
  //       return;
  //     }
  //     if(!ctx.body?.email.endsWith("@students.usd497.org") && !ctx.body?.email.endsWith("@usd497.org")){
  //       throw new APIError("BAD_REQUEST", {
  //         message: "Invalid email. Must be a USD 497 email.",
  //       });
  //     }
  //   })
  // },
  database: mongodbAdapter(db, {
    client,
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60,
    }
  },
  plugins: [nextCookies(), admin()],
});
