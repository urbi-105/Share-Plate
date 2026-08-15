const express = require("express");
const router = express.Router();

const {
  getDonorDashboard,
  getNGODashboard,
} = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/donor",
  authMiddleware,
  getDonorDashboard
);

router.get(
  "/ngo",
  authMiddleware,
  getNGODashboard
);

module.exports = router;