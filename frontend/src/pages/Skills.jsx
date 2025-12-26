import { useState } from "react";
import API from "../services/api";

const Skills = () => {
  const [skillsHave, setSkillsHave] = useState([]);
  const [skillsWant, setSkillsWant] = useState([]);

  const saveSkills = async () => {
    await API.post("/skills/add", { skillsHave, skillsWant });
    alert("Skills saved");
  };

  return (
    <div>
      <h2>My Skills</h2>
      <button onClick={saveSkills}>Save Skills</button>
    </div>
  );
};

export default Skills;
