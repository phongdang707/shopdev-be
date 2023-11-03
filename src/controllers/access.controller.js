const { CREATED, SuccessResponse } = require("../core/success.response");
const AccessServices = require("../services/access.services");

class AccessController {
  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessServices.login(req.body),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    new CREATED({
      message: "Registered OK!",
      metadata: await AccessServices.signUp(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
