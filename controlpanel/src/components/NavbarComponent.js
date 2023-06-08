import React from "react";
import {Link} from "react-router-dom"

function navbarComponent() {
  return (
    <div style={styles.navBarContainer}>
      <a href="/Dashboard/" style={styles.Typography}>Home</a>
      <ul style={styles.list}>
        <li><Link to="/Dashboard/BusManager" style={styles.Typography}>Bus Manager</Link></li>
        <li><Link to="/Dashboard/StopManager" style={styles.Typography}>Stop Manager</Link></li>
        <li><Link to="/Dashboard/ScheduleManager" style={styles.Typography}>Schedule Manager</Link></li>
        <li><Link to="/Dashboard/RouteManager" style={styles.Typography}>Route Manager</Link></li>
      </ul>
    </div>
  );
}

export default navbarComponent

const styles = {
    navBarContainer:{
        backgroundColor:'#8ab8a8',
        borderRadius: '30px',
        borderStyle: 'dashed',
        borderWidth: '3px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem', 
        padding: '0 2rem'
    },
    list:{
      listStyle: 'none',
      padding: '0',
      display: 'flex',
      gap: '1rem'
    },
    Typography:{
      textDecoration: 'none',
      fontFamily: 'American Typewriter',
      borderRadius: '15px',
      backgroundColor: '#c6cca5',
      padding:'5px',
      display: 'inline-block',
      lineHeight: '1em'
      },
}