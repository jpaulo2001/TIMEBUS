import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBus, faThumbtack, faClock, faRoute, faArrowRightFromBracket, faPhone} from '@fortawesome/free-solid-svg-icons'

function NavbarComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');

    navigate('/Login')
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    if (!storedUser) logout();
  }, []);

  return (
    <div style={styles.navBarContainer}>
      <img src={'/assets/logo/logo.png'} style={styles.logo} alt="logo"/>
      <ul style={styles.list}>
        <li style={styles.listItem}><Link to="/Dashboard/" style={styles.button}><FontAwesomeIcon icon={faHouse} style={styles.icon} />Home </Link></li>
        <li style={styles.listItem}><Link to="/Dashboard/BusManager" style={styles.button}><FontAwesomeIcon icon={faBus} style={styles.icon} />Buses</Link></li>
        <li style={styles.listItem}><Link to="/Dashboard/StopManager" style={styles.button}><FontAwesomeIcon icon={faThumbtack} style={styles.icon} />Stops</Link></li>
        <li style={styles.listItem}><Link to="/Dashboard/ScheduleManager" style={styles.button}><FontAwesomeIcon icon={faClock} style={styles.icon} />Schedules</Link></li>
        <li style={styles.listItem}><Link to="/Dashboard/RouteManager" style={styles.button}><FontAwesomeIcon icon={faRoute} style={styles.icon} />Routes</Link></li>
        <li style={styles.listItem}><button onClick={logout} style={styles.button}><FontAwesomeIcon icon={faArrowRightFromBracket} style={styles.icon} />Logout</button></li>
      </ul>
      <div style={styles.userBox}>
            <p>Welcome {user.name}</p>
            <p>{time.toLocaleTimeString()}</p>
          </div>
    </div>
  );
}

export default NavbarComponent

const styles = {
  navBarContainer: {
    width: '99%',
    fontSize: "30px",
    backgroundColor: "#8ecae6",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    border: 'black 2px solid',
    borderRadius: "0px",
  },
  list: {
    listStyle: "none",

    width: "50%",
    display: "flex",
    justifyContent: 'space-between',
    flexWrap: "wrap",
    padding: 0,
  },
  listItem: {
    width: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    minWidth: '2.5rem',
    height: 'auto',
    padding: '10px 0',
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "24%",
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
  logo: {
    height: '7rem',
    objectFit: 'contain',
    padding: '0rem',
    marginInline: '0.5rem',
    marginBlock: '1rem',
    borderRadius: '23px',
    backgroundColor: '#219ebc',
    border: 'black 1px solid',
  },
  icon: {
    fontSize: '2rem',
    padding: '0.4rem',
  },
  userBox:{
    background: '#219ebc',
    borderRadius: '15px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'black',
    padding: '10px',
    color: '#fff',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '10%',
    fontSize: '0.8rem',
    marginInline: '0.5rem',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: "Arial, sans-serif",
    boxShadow: "1px 1px 8px 4px rgba(0, 0, 0, 0.2)",
  }
};
