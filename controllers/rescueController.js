const asyncHandler = require(
  "express-async-handler"
);

const userService = require(
  "../services/userServices"
);

/**
 * @desc Get tickets assigned to logged-in rescue employee
 * @route GET /api/rescue/my-tickets
 */
const getMyAssignedTickets =
  asyncHandler(async (req, res) => {
    const employeeId =
      req.employee._id ||
      req.employee.id;

    if (!employeeId) {
      res.status(401);
      throw new Error(
        "Logged-in employee ID is missing"
      );
    }

    const response =
      await userService.get(
        `/api/user/rescue/assigned/${employeeId.toString()}`
      );

    res.status(200).json(
      response.data
    );
  });

module.exports = {
  getMyAssignedTickets,
};