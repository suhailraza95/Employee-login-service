const express = require("express");

const {
  loginEmployee,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginEmployee);

module.exports = router;