import React from "react";
import {Link, useNavigate} from "react-router-dom"

function NavbarComponent() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('jwt');
    navigate('/Login')
  }

  return (
    <div style={styles.navBarContainer}>
      <ul style={styles.list}>
      <Link to="/Dashboard/" style={styles.Typography}> Home </Link>
        <li><Link to="/Dashboard/BusManager" style={styles.Typography}>Bus Manager</Link></li>
        <li><Link to="/Dashboard/StopManager" style={styles.Typography}>Stop Manager</Link></li>
        <li><Link to="/Dashboard/ScheduleManager" style={styles.Typography}>Schedule Manager</Link></li>
        <li><Link to="/Dashboard/RouteManager" style={styles.Typography}>Route Manager</Link></li>
        <button class onClick={logout} style={styles.Typography}>logout</button>
      </ul>
    </div>
  );
}

export default NavbarComponent

const styles = {
  navBarContainer: {
    fontSize: "30px",
    backgroundColor: "#8ab8a8",
    borderRadius: "30px",
    borderStyle: "solid",
    borderWidth: "3px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },

  list: { 
    listStyle: "none",
    padding: "0",
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    flexWrap: "wrap",
  },

  Typography: {
    margin: "1.3% 0% 0% 0%",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#3498db",
    border: "none",
    borderRadius: "50px",
    padding: "5px 24px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
  },
};
