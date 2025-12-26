const express = require("express");
const protect = require("../middleware/authMiddleware");
const { findMatches } = require("../controllers/matchController");

const router = express.Router();

router.get("/", protect, findMatches);

module.exports = router;
