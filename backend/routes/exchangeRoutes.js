const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  createExchange,
  acceptExchange,
  rejectExchange,
  completeExchange,
  getMySentRequests,
  getMyReceivedRequests,
} = require("../controllers/exchangeController");

const router = express.Router();

router.post("/", protect, createExchange);
router.get("/sent", protect, getMySentRequests);
router.get("/received", protect, getMyReceivedRequests);
router.put("/:id/accept", protect, acceptExchange);
router.put("/:id/reject", protect, rejectExchange);
router.put("/:id/complete", protect, completeExchange);

module.exports = router;
