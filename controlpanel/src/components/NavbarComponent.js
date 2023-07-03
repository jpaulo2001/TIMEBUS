import React from "react";
import {Link, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBus, faThumbtack, faClock, faRoute, faArrowRightFromBracket, faPhone} from '@fortawesome/free-solid-svg-icons'

function NavbarComponent() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('jwt');
    navigate('/Login')
  }

  return (
    <div style={styles.navBarContainer}>
      <img src={'/assets/logo/logo.png'} style={styles.logo} alt="logo"/>
      <ul style={styles.list}>
        <li style={styles.listItem}><Link to="/Dashboard/" style={styles.button}><FontAwesomeIcon icon={faHouse} style={styles.icon}/>Home </Link></li>
        <li style={styles.listItem}><Link to="/Dashboard/BusManager" style={styles.button}><FontAwesomeIcon icon={faBus} style={styles.icon}/>Buses</Link></li>
        <li style={styles.listItem}><Link to="/Dashboard/StopManager" style={styles.button}><FontAwesomeIcon icon={faThumbtack} style={styles.icon}/>Stops</Link></li>
        <li style={styles.listItem}><Link to="/Dashboard/ScheduleManager" style={styles.button}><FontAwesomeIcon icon={faClock} style={styles.icon}/>Schedules</Link></li>
        <li style={styles.listItem}><Link to="/Dashboard/RouteManager" style={styles.button}><FontAwesomeIcon icon={faRoute} style={styles.icon}/>Routes</Link></li>
        <li style={styles.listItem}><Link to="/Dashboard/Contacts" style={styles.button}><FontAwesomeIcon icon={faPhone} style={styles.icon}/>Contacts </Link></li>
        <li style={styles.listItem}><button onClick={logout} style={styles.button}><FontAwesomeIcon icon={faArrowRightFromBracket} style={styles.icon}/>Logout</button></li>
      </ul>
    </div>
  );
}

export default NavbarComponent

const styles = {
  navBarContainer: {
    width: '100vw',
    fontSize: "30px",
    backgroundColor: "#8ecae6",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    border: 'black 2px solid',
    borderRadius: "5px",
  },
  list: { 
    listStyle: "none",
    marginInlineEnd: '10%',
    width: "70%",
    display: "flex",
    justifyContent: 'space-between',
    flexWrap: "wrap",
    padding: 0,
  },
  listItem: {
    width: '10vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    height: 'auto',
    padding: '10px 0',
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "0.8rem",
    color: "#fff",
    backgroundColor: "#219ebc",
    border: "1px solid black",
    borderRadius: "10px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: "1px 1px 8px 4px rgba(0, 0, 0, 0.2)",
    textDecoration: 'none',
    flexDirection: 'column',
  },
  logo:{
    height: '7rem', 
    objectFit: 'contain',
    padding: '0rem',
    marginInline: '0.5rem',
    marginBlock: '1rem',
    borderRadius: '23px',
    backgroundColor: '#219ebc',
    border: 'black 1px solid',
  },
  icon:{
    fontSize:'2rem',
    padding:'0.4rem',
  }
};
