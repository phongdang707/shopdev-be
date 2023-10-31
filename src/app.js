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

module.exports = app;
