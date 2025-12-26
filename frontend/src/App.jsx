import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Matches from "./pages/Matches";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";
import MyRequests from "./pages/MyRequests";

function App() {
  const location = useLocation();
  const showNavbar =
  location.pathname !== "/login" &&
  location.pathname !== "/register";


  return (
    <>
      {showNavbar && <Navbar />}


      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/matches"
          element={
            <ProtectedRoute>
              <Matches />
            </ProtectedRoute>
          }
        />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <MyRequests />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;
