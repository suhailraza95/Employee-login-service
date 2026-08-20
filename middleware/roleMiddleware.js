const authorizeEmployeeType = (
  ...allowedTypes
) => {
  return (req, res, next) => {
    if (!req.employee) {
      res.status(401);
      throw new Error(
        "Employee authentication required"
      );
    }

    const employeeType =
      req.employee.employeeType ||
      req.employee.type ||
      req.employee.role;

    if (
      !allowedTypes.includes(employeeType)
    ) {
      res.status(403);
      throw new Error(
        "You are not authorized for this action"
      );
    }

    next();
  };
};

module.exports = authorizeEmployeeType;