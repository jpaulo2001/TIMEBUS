import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function BusManager() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    fetch('http://localhost:4000/api/buses',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch((err) => console.log(err));
  }, []);

  const removeSelection = (selection) => {
    selection.forEach((element) => {
      element.remove();
    });
  }

  let selection = [];
  const handleOnChange = (event) => {
    if(event.target.checked) selection.push(event.target.parentNode)
  }
    
  return (
      <div style={styles.formContainer}>
        <div style={styles.buttonContainerStyle}>
          <Link to="/Dashboard/BusForm" style={styles.buttonStyle}>Add Bus</Link>
          <input type='button' value="Remove" style={styles.buttonStyle} onClick={() => removeSelection(selection)}/>
        </div>
        <ul style={styles.elementsList}>
            {buses.map((bus, index)=>(
              <div key={index}>
                <li style={styles.Typography}><input type="checkbox" onChange={handleOnChange}></input>Name: {bus.busName} , Route: {bus.busRoute} , Capacity: {bus.capacity}</li>
                <hr style={styles.separatorItem}/>
              </div>
            ))}
        </ul>
      </div>
  );
}

export default BusManager

const styles = {
  formContainer:{
    margin: '2%',
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
  buttonStyle:{
    backgroundColor: 'Green',
    borderRadius: '25px',
    marginTop: '10vh',
    padding: '20px',
    margin: '1vw'
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