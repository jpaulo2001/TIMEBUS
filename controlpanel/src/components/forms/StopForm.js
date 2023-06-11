import React, { useRef } from "react";
import {Link, useNavigate} from "react-router-dom"

function StopForm() {
  const navigate = useNavigate();

  const stopNameRef = useRef();
  const latRef = useRef();
  const lngRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault()
    let stop = {
      stopName : stopNameRef.current.value,
      lat      : latRef.current.value,
      lng      : lngRef.current.value
    };
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:4000/api/stops',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(stop)
      }).then(() => {navigate('/Dashboard/BusManager')}).catch((err) => console.log(err));
  }
  return (
    <form id="busStopForm" onSubmit={(event) =>handleSubmit(event)} method="POST" style={styles.formContainer}>
      <Link to="/Dashboard/StopManager" style={styles.goBack}>Go Back</Link>
      <div style={styles.inputContainer}>
        <label htmlFor="stopName" style={styles.Typography}>Stop Name:</label>
        <input type="text" ref={stopNameRef} id="stopName" name="stopName" required style={styles.inputField}/>

        <label htmlFor="lat" style={styles.Typography}>Latitude:</label>
        <input type="number" ref={latRef} id="lat" name="lat" required style={styles.inputField}/>
        
        <label htmlFor="lng" style={styles.Typography}>Longitude:</label>
        <input type="number" ref={lngRef} id="lng" name="lng" required style={styles.inputField}/>
      </div>

      <button type="submit" style={styles.addButton}>Add Stop</button>
    </form>
  );
}

export default StopForm

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
  goBack: {
    marginBottom: '30px',
    backgroundColor: 'green',
    padding: '15px',
    borderRadius: '15px',
  }
}
