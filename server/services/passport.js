const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const config = require("../config/config");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL:
        config.nodeEnv === "development"
          ? "/auth/google/callback"
          : "https://okiki-email-campaign-api.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = await User.create({ googleId: profile.id });
      done(null, newUser);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook.appId,
      clientSecret: config.facebook.appSecret,
      callbackURL:
        config.nodeEnv === "development"
          ? "/auth/google/callback"
          : "https://okiki-email-campaign-api.onrender.com/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = await User.create({ googleId: profile.id });
      done(null, newUser);
    }
  )
);
