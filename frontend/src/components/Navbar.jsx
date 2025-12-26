import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#111827",
        padding: "14px 20px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>SkillBridge AI</h3>

      <div>
        <Link to="/dashboard" style={{ color: "white", marginRight: 15 }}>
          Dashboard
        </Link>
        <Link to="/skills" style={{ color: "white", marginRight: 15 }}>
          Skills
        </Link>
        <Link to="/matches" style={{ color: "white", marginRight: 15 }}>
          Matches
        </Link>
        <Link to="/requests" style={{ color: "white", marginRight: 15 }}>
          My Requests
        </Link>


        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
