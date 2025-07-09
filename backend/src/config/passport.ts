import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import axios from "axios";
import User from "../models/User";

// --- Google Strategy ---
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("No email found"), false);

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            provider: "google",
          });
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// --- GitHub Strategy ---
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "/api/auth/github/callback",
    },
    async (accessToken: string, _refreshToken: any, profile: any, done: any) => {
      try {
        const { data: emails } = await axios.get("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${accessToken}`,
            "User-Agent": "Animatic-App",
            Accept: "application/vnd.github.v3+json",
          },
        });

        const primaryEmail = emails.find(
          (e: { email: string; primary: boolean; verified: boolean }) => e.primary && e.verified
        )?.email;

        if (!primaryEmail) {
          return done(new Error("No verified email from GitHub"), false);
        }

        let user = await User.findOne({ email: primaryEmail });

        if (!user) {
          user = await User.create({
            name: profile.displayName || profile.username,
            email: primaryEmail,
            provider: "github",
          });
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// --- Passport Session Setup ---
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
