import React, { useRef } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faThumbtack} from '@fortawesome/free-solid-svg-icons'

function StopForm() {
  const navigate = useNavigate();

  const stopNameRef = useRef();
  const latRef = useRef();
  const lngRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault()
    let stop = {
      stopName: stopNameRef.current.value,
      lat: latRef.current.value,
      lng: lngRef.current.value
    };
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:4000/api/stops',{
      method: 'POST',
      headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify(stop)
      }).then(() => {navigate('/Dashboard/StopManager')}).catch((err) => console.log(err));
  }

  return (
    <form id="busStopForm" onSubmit={(event) =>handleSubmit(event)} method="POST" style={styles.formContainer}>
      <Link to="/Dashboard/StopManager" style={styles.goBack}><FontAwesomeIcon icon={faArrowLeft}/> Go Back</Link>
      <div style={styles.inputContainer}>
        <label htmlFor="stopName" style={styles.Typography}>Stop Name:</label>
        <input type="text" ref={stopNameRef} required style={styles.inputField}/>

        <label htmlFor="lat" style={styles.Typography}>Latitude:</label>
        <input type="text" ref={latRef} style={styles.inputField}/>
        
        <label htmlFor="lng" style={styles.Typography}>Longitude:</label>
        <input type="text" ref={lngRef} style={styles.inputField}/>
      </div>

      <button type="submit" style={styles.addButton}><FontAwesomeIcon icon={faThumbtack}/> Add Stop</button>
    </form>
  );
}

export default StopForm

const styles = {
  formContainer: {
    margin: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5%',
    backgroundColor: '#bde0fe',
    border: '2px dashed black',
    borderRadius: '5px',
  },
  Typography: {
    fontSize: '1.5rem',
    fontFamily: 'American Typewriter',
    color: '#464646',
  },
  addButton: {
    backgroundColor: '#219ebc',
    borderRadius: '5px',
    border: '1px solid black',
    padding: '0.5rem',
    margin: '1vw',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    fontFamily: 'American Typewriter',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    padding: '1rem',
    borderRadius: '5px',
    background: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  inputField: {
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    fontFamily: 'American Typewriter',
  },
  goBack: {
    marginBottom: '30px',
    backgroundColor: '#219ebc',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease',
  }
}
