const calculateMatchScore = (currentUser, targetUser) => {
  let score = 0;

  // 1. Skill Match (50%)
  currentUser.skillsWant.forEach((want) => {
    targetUser.skillsHave.forEach((have) => {
      if (want.skill === have.skill) {
        score += 50;
      }
    });
  });

  // 2. Reverse Match (30%)
  currentUser.skillsHave.forEach((have) => {
    targetUser.skillsWant.forEach((want) => {
      if (have.skill === want.skill) {
        score += 30;
      }
    });
  });

  // 3. Trust Score (20%)
  score += targetUser.trustScore * 4;

  return score;
};

module.exports = calculateMatchScore;
