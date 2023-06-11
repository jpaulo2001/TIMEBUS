import React, { useRef }  from "react";
import {Link, useNavigate} from "react-router-dom"

function BusForm() {

  const navigate = useNavigate();

  const busNameRef = useRef();
  const busRouteRef = useRef();
  const capacityRef = useRef();
  const isAvailableRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault()
    let bus = {
      busName: busNameRef.current.value,
      busRoute: busRouteRef.current.value,
      capacity: capacityRef.current.value,
      isAvailable: isAvailableRef.current.value
    };
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:4000/api/buses',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bus)
      }).then(() => {navigate('/Dashboard/BusManager')}).catch((err) => console.log(err));
  }

  return (
    <form id="busForm" onSubmit={(event) =>handleSubmit(event)} method="POST" style={styles.formContainer}>
      <Link to="/Dashboard/BusManager" style={styles.goBack}>Go Back</Link>
      <div style={styles.inputContainer}>
        <label htmlFor="busName" style={styles.Typography}>Bus Name:</label>
        <input ref={busNameRef} type="text" id="busName" name="busName" required style={styles.inputField}/>
      
        <label htmlFor="busRoute" style={styles.Typography}>Bus Route:</label>
        <input ref={busRouteRef} type="text" id="busRoute" name="busRoute" required style={styles.inputField}/>
      
        <label htmlFor="capacity" style={styles.Typography}>Capacity:</label>
        <input ref={capacityRef} type="number" id="capacity" name="capacity" required style={styles.inputField}/>

        <label htmlFor="isAvailable" style={styles.Typography}>Available:</label>
        <select ref={isAvailableRef} id="isAvailable" name="isAvailable" required>
          <option value="">Select...</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    <button type="submit" style={styles.addButton}>Add Bus</button>
  </form>
  );
}

export default BusForm

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