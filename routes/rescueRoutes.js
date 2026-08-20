const express = require("express");

const router = express.Router();

const {
  getMyAssignedTickets,
} = require(
  "../controllers/rescueController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const authorizeEmployeeType = require(
  "../middleware/roleMiddleware"
);

router.get(
  "/my-tickets",
  protect,
  authorizeEmployeeType("rescue"),
  getMyAssignedTickets,
);

module.exports = router;