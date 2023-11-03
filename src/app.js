const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());

// init db

require("../src/dbs/init.mongodb");

// init routers
app.use("", require("./routers"));

// handle error

app.use((_req, _res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((error, _req, res, _next) => {
  console.log("error____ahihi", error);
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
