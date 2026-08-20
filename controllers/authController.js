const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Employee = require("../models/employeeModel");

const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const employee = await Employee.findOne({
      email: email.toLowerCase().trim(),
    });

    console.log("Employee found:", employee);

    if (!employee) {
      return res.status(401).json({
        message: "Employee not found",
      });
    }

    console.log("Stored password:", employee.password);
    console.log("Entered password:", password);

    const passwordMatches = await bcrypt.compare(
      password,
      employee.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: employee._id,
        employeeId: employee.employeeId,
        type: employee.type,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      employee: {
        id: employee._id,
        name: employee.name,
        employeeId: employee.employeeId,
        email: employee.email,
        type: employee.type,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  loginEmployee,
};