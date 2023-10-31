const mongoose = require("mongoose");

const connectString =
  "mongodb+srv://phongdang707:pmTZKGwBmM7mrk4z@cluster0.0fxa78n.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(connectString)
  .then((_) => console.log("Connected Mongodb success"))
  .catch((err) => console.log("Err connect!"));

// dev
if (1 === 0) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;
