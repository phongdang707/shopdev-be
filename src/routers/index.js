const express = require("express");
const router = express.Router();
const app = express();

router.use("/v1/api", require("./access/index"));
router.post("/v1/api", (req, res) => {
  console.log("req________123123", req.body);
});

module.exports = router;
