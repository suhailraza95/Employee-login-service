const axios = require("axios");

const userService = axios.create({
  baseURL: process.env.USER_SERVICE_URL,

  headers: {
    "x-api-key":
      process.env.USER_SERVICE_API_KEY,
  },
});

module.exports = userService;