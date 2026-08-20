const Employee = require("../models/employeeModel");

const asyncHandler = require(
  "express-async-handler"
);

const userService = require(
  "../services/userServices"
);

const getWaitingTickets = asyncHandler(
  async (req, res) => {
    const response = await userService.get(
      "/api/user/rescue/waiting"
    );

    res.status(200).json(response.data);
  }
);

/**
 * @desc Assign rescue employee
 * @route PATCH /api/customer-care/tickets/:ticketId/assign
 */
const assignRescueEmployee = asyncHandler(
  async (req, res) => {
    const { ticketId } = req.params;

    const { rescueEmployeeId } = req.body;

    if (!rescueEmployeeId) {
      res.status(400);
      throw new Error(
        "Rescue employee ID is required"
      );
    }

    const rescueEmployee =
      await Employee.findById(
        rescueEmployeeId
      );

    if (!rescueEmployee) {
      res.status(404);
      throw new Error(
        "Rescue employee not found"
      );
    }

    const employeeType =
      rescueEmployee.employeeType ||
      rescueEmployee.type ||
      rescueEmployee.role;

    if (employeeType !== "rescue") {
      res.status(400);
      throw new Error(
        "Selected employee is not a rescue employee"
      );
    }

    if (
      rescueEmployee.isActive === false
    ) {
      res.status(400);
      throw new Error(
        "Selected rescue employee is inactive"
      );
    }

const customerCareEmployeeId =
  req.employee._id ||
  req.employee.id;

if (!customerCareEmployeeId) {
  res.status(401);
  throw new Error(
    "Logged-in customer-care employee ID is missing"
  );
}

if (!rescueEmployee.phone) {
  res.status(400);
  throw new Error(
    "Rescue employee phone number is missing"
  );
}
console.log("test xyz")

const response = await userService.patch(
  `/api/user/rescue/${ticketId}/assign`,
  {
    rescueEmployeeId:
      rescueEmployee._id.toString(),

    customerCareEmployeeId:
      customerCareEmployeeId.toString(),

    rescueEmployeeName:
      rescueEmployee.name,

    rescueEmployeePhone:
      rescueEmployee.phone,
  }
);

res.status(200).json(response.data);
  }
);

module.exports = {
  getWaitingTickets,
  assignRescueEmployee,
};