import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: "#14151a",
      width: "100%",
      padding: "10px 20px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
      color: "#fff"
    }}>
      <Link to="/" style={{ marginRight: "10px", color: "#00cec9" }}>Home</Link>
      <Link to="/about" style={{ marginRight: "10px", color: "#00cec9" }}>About</Link>

      {isLoggedIn && (
        <>
          <Link to="/appointment" style={{ marginRight: "10px", color: "#00cec9" }}>Book Appointment</Link>
          <Link to="/dashboard" style={{ marginRight: "10px", color: "#00cec9" }}>Dashboard</Link>
          <Link to="/prescription" style={{ marginRight: "10px", color: "#00cec9" }}>Prescription</Link>
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/register" style={{ marginRight: "10px", color: "#00cec9" }}>Register</Link>
          <Link to="/login" style={{ color: "#00cec9" }}>Login</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
