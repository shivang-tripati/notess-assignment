import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../prisma.ts";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"]!,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"]!,
      callbackURL: `${process.env["REACT_APP_BACKEND_URL"]}/auth/google/callback`!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {

        const email = profile.emails?.[0]?.value;
        if (!email) throw new Error("Google profile email is missing");


        let user = await prisma.user.findUnique({
          where: { email},
        });

        if (user) {
          // If user exists but has no googleId → link it
          if (!user.googleId) {
            user = await prisma.user.update({
              where: { email },
              data: { googleId: profile.id, name: user.name || profile.displayName },
            });
          }
        } else {
          // If no user → create new with googleId
          user = await prisma.user.create({
            data: {
              email,
              name: profile.displayName,
              googleId: profile.id,
            },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
