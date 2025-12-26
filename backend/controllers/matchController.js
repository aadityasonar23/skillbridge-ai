const User = require("../models/User");
const calculateMatchScore = require("../utils/matchEngine");

exports.findMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user);

    const users = await User.find({ _id: { $ne: req.user } });

    const matches = users
      .map((user) => ({
        userId: user._id,
        name: user.name,
        skillsHave: user.skillsHave,
        skillsWant: user.skillsWant,
        trustScore: user.trustScore,
        matchScore: calculateMatchScore(currentUser, user),
      }))
      .filter((match) => match.matchScore > 50)
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
