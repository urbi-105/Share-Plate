const express = require("express");

const router = express.Router();

const {
  createRequest,
  getMyRequests,
  updateRequestStatus,
  getIncomingRequests,
} = require("../controllers/requestController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  createRequest
);

router.get(
  "/my-requests",
  authMiddleware,
  getMyRequests
);

router.get(
  "/incoming",
  authMiddleware,
  getIncomingRequests
);

router.put(
  "/:id/status",
  authMiddleware,
  updateRequestStatus
);

module.exports = router;