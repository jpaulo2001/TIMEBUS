import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function BusManager() {

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/Routes')
      .then((res) => res.json())
      .then((data) => setRoutes(data))
      .catch((err) => console.log(err));
    }, []);

  return (
      <div style={styles.formContainer}>
        <ul style={styles.elementsList}>
            {routes.map((route, index)=>(
              <div>
                <li style={styles.Typography}>Route number: {route.routeNumber} , stops: {route.stops}</li>
                <hr style={styles.separatorItem}/>
              </div>
            ))}
        </ul>
        <Link to="/Dashboard/RouteForm" style={styles.addTypography}>Add route</Link>
      </div>
  );
}

export default BusManager

const styles = {
  formContainer:{
    margin: '5%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderRadius:'30px',
    backgroundColor: '#8ab8a8',
    padding: '5%',
  },
  Typography:{
    fontSize: '2rem',
    fontFamily: 'American Typewriter',
  },
  addTypography:{
    backgroundColor: 'Green',
    borderRadius: '25px',
    marginTop: '10vh',
    padding: '20px',
  },
  addButton:{
    height: '50px',
    width: '100px',
    margin: '20px',
    backgroundColor: '#c6cca5',
    borderRadius: '15px',
    border: 'solid',
    borderWidth: '1px',
    cursor: 'pointer',
    fontSize: '80%',
    fontFamily: 'American Typewriter',
  },
  inputContainer:{
    height: '100vh',
  },
  inputField: {
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '100%',
    fontFamily: 'American Typewriter',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  elementsList: {
    display: 'block',
    listStyle: 'none',
    background: 'grey',
    borderRadius: '20px',
    padding: '30px',
    width: '70vw'
  },
  separatorItem: {
    backgroundColor: 'Transparent',

  }
}