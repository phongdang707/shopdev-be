const AccessServices = require("../services/access.services");

class AccessController {
  signUp = async (req, res, next) => {
    console.log("vao day");
    try {
      console.log("[P]::signup::", req.body);
      return res.status(201).json(await AccessServices.signUp(req.body));
    } catch (error) {
      // console.log("err", error);
      next(error);
    }
  };
}

module.exports = new AccessController();
