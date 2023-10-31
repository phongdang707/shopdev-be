const dev = {
  app: {
    port: process.env.DEV_PORT,
  },
  db: {
    host: process.env.DEV_DB_PORT,
    port: process.env.DEV_DB_PORT,
    name: process.env.DEV_DB_PORT,
  },
};

const prod = {
  app: {
    port: process.env.PROD_PORT,
  },
  db: {
    host: process.env.PROD_DB_PORT,
    port: process.env.PROD_DB_PORT,
    name: process.env.PROD_DB_PORT,
  },
};

const config = { dev, prod };

const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
