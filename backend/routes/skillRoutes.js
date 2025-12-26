const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  addSkills,
  getMySkills,
} = require("../controllers/skillController");

const router = express.Router();

router.post("/add", protect, addSkills);
router.get("/me", protect, getMySkills);

module.exports = router;
