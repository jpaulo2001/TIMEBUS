import React, { useState, useEffect } from 'react';

function BusManager() {

  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/buses')
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch((err) => console.log(err));
    }, []);

  console.log(buses)
  return (
    <form id="busForm" action="your-api-url-here" method="POST" style={styles.formContainer}>
      <div style={styles.inputContainer}>
        <ul>
            
        </ul>
      </div>
    </form>
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
    padding: '5%'
  },
  Typography:{
    fontSize: '100%',
    fontFamily: 'American Typewriter',
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
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: '1fr 2fr',
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
}