const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAdminDashboard,
  deleteUser,
} = require("../controllers/adminController");
router.get(
  "/dashboard",
  authMiddleware,
  getAdminDashboard
);
router.delete(
  "/users/:id",
  authMiddleware,
  deleteUser
);

module.exports = router;