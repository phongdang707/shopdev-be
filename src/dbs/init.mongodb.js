const mongoose = require("mongoose");
const { countConnect } = require("../helpers/checkConnect");

const connectString =
  "mongodb+srv://phongdang707:pmTZKGwBmM7mrk4z@cluster0.0fxa78n.mongodb.net";

class Database {
  constructor() {
    console.log("constructor");
    this.connect();
  }

  // connect db
  connect(type = "mongodb") {
    console.log("type____", type);
    // dev
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString)
      .then((_) => {
        console.log("Connected Mongodb success");
        countConnect();
      })
      .catch((err) => console.log("Err connect!"));
  }

  static getInstances() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstances();
module.exports = instanceMongodb;
