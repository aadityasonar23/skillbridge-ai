import { useEffect, useState } from "react";
import API from "../services/api";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    API.get("/matches").then((res) => setMatches(res.data));
  }, []);

  const requestSkill = async (match) => {
    try {
      setLoadingId(match.userId);

      await API.post("/exchanges", {
        responderId: match.userId,
        offeredSkill: match.skillsHave?.[0]?.skill || "React",
        requestedSkill: match.skillsWant?.[0]?.skill || "Node.js",
      });

      alert("Skill request sent!");
    } catch (err) {
      alert("Failed to send request");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="container">
      <h2>Best Matches</h2>

      {matches.length === 0 && <p>No matches found</p>}

      {matches.map((m) => (
        <div className="card" key={m.userId}>
          <h3>{m.name}</h3>
          <p>Match Score: <strong>{m.matchScore}</strong></p>
          <p>Trust Score: {m.trustScore}</p>

          <button
            onClick={() => requestSkill(m)}
            disabled={loadingId === m.userId}
          >
            {loadingId === m.userId ? "Requesting..." : "Request Skill"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Matches;
