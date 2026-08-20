require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const customerCareRoutes = require("./routes/customerCareRoutes");
const rescueEmployeeRoutes = require("./routes/rescueRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");


const app = express();

connectDB();

app.use(express.json());

app.use("/api/rescue",rescueEmployeeRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Employee login service is running",
  });
});

app.use("/api/employee", authRoutes);

app.use("/api/customer-care",customerCareRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5006;

app.listen(PORT, () => {
  console.log(`Employee login service running on port ${PORT}`);
});