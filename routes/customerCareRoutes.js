const express = require("express");

const router = express.Router();

const {
  getWaitingTickets,
  assignRescueEmployee,
} = require("../controllers/customerCareController");

const protect = require("../middleware/authMiddleware");
const authorizeEmployeeType = require("../middleware/roleMiddleware");

router.get(
  "/tickets",
  protect,
  authorizeEmployeeType(
    "customerCare"
  ),
  getWaitingTickets
);

router.patch(
  "/tickets/:ticketId/assign",
  protect,
  authorizeEmployeeType(
    "customerCare"
  ),
  assignRescueEmployee
);


module.exports = router;