const User = require("../models/User");

// ADD / UPDATE SKILLS
exports.addSkills = async (req, res) => {
  try {
    const { skillsHave, skillsWant } = req.body;

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update skills
    user.skillsHave = skillsHave;
    user.skillsWant = skillsWant;

    await user.save();

    res.json({
      message: "Skills updated successfully",
      skillsHave: user.skillsHave,
      skillsWant: user.skillsWant,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET LOGGED-IN USER SKILLS
exports.getMySkills = async (req, res) => {
  try {
    const user = await User.findById(req.user).select(
      "skillsHave skillsWant trustScore"
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
