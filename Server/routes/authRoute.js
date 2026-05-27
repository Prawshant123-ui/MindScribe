const express = require("express");

const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();
const {
  registerValidator,
  loginValidator,
} = require("../middlewares/authValidator");
const  validateRequest  = require("../middlewares/validateRequest");
const { apiLimiter, loginLimiter } = require("../middlewares/rateLimiter");

router.post(
  "/register",
  registerValidator,
  validateRequest,
  registerUser,
);
router.post("/login", loginValidator, validateRequest, loginLimiter, loginUser);


module.exports = router;
