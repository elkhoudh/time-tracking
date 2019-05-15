const json = require("express").json();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

// Routes
const auth = require("../routes/auth");
const timer = require("../routes/timer");

const configureMiddleware = server => {
  server.use(json);
  server.use(helmet());
  server.use(morgan("dev"));
  server.use(cors());
  server.use("/api/auth", auth);
  server.use("/api/timer", timer);
};

module.exports = {
  configureMiddleware
};
