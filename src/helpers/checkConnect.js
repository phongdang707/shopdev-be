const mongoose = require("mongoose");

const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log("Number connect", numConnection);
};

const checkOverload = () => {
  setInterval(() => {}, 5000);
};

module.exports = { countConnect, checkOverload };
