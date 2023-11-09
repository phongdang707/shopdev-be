const express = require("express");
const AccessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/autUtils");
const router = express.Router();

router.post("/shop/signup", asyncHandler(AccessController.signUp));
router.post("/shop/login", asyncHandler(AccessController.login));

//authentication
router.use(authentication);

router.post("/shop/logout", asyncHandler(AccessController.logout));
router.post("/shop/ahihi", (req, res, next) => {
  return res.json({
    status: "success",
    message: "ahihi",
  });
});

module.exports = router;
