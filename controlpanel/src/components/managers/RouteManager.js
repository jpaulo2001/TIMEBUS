import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function RouteManager() {

  const [routes, setRoutes] = useState([]);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    fetchRoutes()
    }, []);
  
    const fetchRoutes = () => {
      const token = localStorage.getItem('jwt');
      fetch('http://localhost:4000/api/routes',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => setRoutes(data))
        .catch((err) => console.log(err));
    }

  const removeSelection = () => {
    const token = localStorage.getItem('jwt');
    selection.forEach((element) => {
      fetch(`http://localhost:4000/api/routes/${element.busName}`,{
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    });
    setSelection([]); // clear selection after removal
    fetchRoutes()
  }
  
  const handleOnChange = (event) => {
    if(event.target.checked) {
      setSelection(prevSelection => [...prevSelection, event.target.parentNode]);
    } else {
      setSelection(prevSelection => prevSelection.filter(sel => sel !== event.target.parentNode));
    }
  }

  return (
      <div style={styles.formContainer}>
        <div style={styles.buttonContainerStyle}>
          <Link to="/Dashboard/RouteForm" style={styles.buttonStyle}>Add route</Link>
          <input type='button' value="Remove" style={styles.buttonStyle} onClick={() => removeSelection()}/>
        </div>
       <ul style={styles.elementsList}>
            {routes.map((route, index)=>(
              <div key={index}>
                <li style={styles.Typography}><input type="checkbox" onChange={handleOnChange}/>Route number: {route.routeNumber} , stops: {route.stops.join(', ')}</li>
                <hr style={styles.separatorItem}/>
              </div>
            ))}
        </ul>
      </div>
  );
}

export default RouteManager

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
  buttonStyle:{
    backgroundColor: 'Green',
    borderRadius: '25px',
    marginTop: '10vh',
    padding: '20px',
    margin: '1vw'
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
  },
  buttonContainerStyle:{
    display: 'flex',
    marginLeft: '70%',
    }
}