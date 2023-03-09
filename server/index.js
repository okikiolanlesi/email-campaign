const express = require("express");
require("./services/passport");
const morgan = require("morgan");
const config = require("./config/config");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(morgan("dev"));

app.use("/auth", authRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
