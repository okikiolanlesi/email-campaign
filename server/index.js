require("https").globalAgent.options.rejectUnauthorized = false;
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./config/config");
const authRoutes = require("./routes/authRoutes");
const passport = require("passport");
const sessionMiddleware = require("express-session");
const MongoStore = require("connect-mongo");

require("./services/passport");

const app = express();

app.use(morgan("dev"));
app.use(
  sessionMiddleware({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: new MongoStore({
      mongoUrl: config.mongoUri,
      ttl: 24 * 60 * 60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

mongoose
  .connect(config.mongoUri, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
