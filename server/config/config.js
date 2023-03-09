require("dotenv").config();

const config = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
};

module.exports = config;
