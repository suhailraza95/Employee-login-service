const jwt = require("jsonwebtoken");
const asyncHandler = require(
  "express-async-handler"
);

const protect = asyncHandler(
  async (req, res, next) => {
    let token;

    const authHeader =
      req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith("Bearer ")
    ) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      res.status(401);
      throw new Error(
        "Not authorized, no token"
      );
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.employee = {
        id: decoded.id,
        employeeType:
          decoded.employeeType ||
          decoded.type ||
          decoded.role,
      };

      next();
    } catch (error) {
      res.status(401);
      throw new Error(
        "Not authorized, invalid tokenn"
      );
    }
  }
);

module.exports = protect;