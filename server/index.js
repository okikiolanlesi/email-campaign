const express = require("express");
const morgan = require("morgan");
const config = require("./config/config");
const authRoutes = require("./routes/authRoutes");

require("./services/passport");

const app = express();

app.use(morgan("dev"));

app.use("/auth", authRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
