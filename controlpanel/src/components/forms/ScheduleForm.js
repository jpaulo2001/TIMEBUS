import React, { useState, useRef } from "react";
import {Link, useNavigate} from 'react-router-dom'

function SchedulesForm() {
  const navigate = useNavigate();
  const [departureTimes, setDepartureTimes] = useState([""]);

  const StopNameRef = useRef();
  const BusNameRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault()
    let schedule = {
      busName        : BusNameRef.current.value,
      stopName       : StopNameRef.current.value,
      departureTimes : departureTimes,
    };
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:4000/api/schedules',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(schedule)
      }).then(() => {navigate('/Dashboard/ScheduleManager')}).catch((err) => console.log(err));
  }

  const handleDepartureChange = (index, event) => {
    const times = [...departureTimes];
    times[index] = event.target.value;
    setDepartureTimes(times);
  };

  const handleAddDeparture = () => {
    setDepartureTimes([...departureTimes, ""]);
  };

  const handleRemoveDeparture = (index) => {
    const times = [...departureTimes];
    times.splice(index, 1);
    setDepartureTimes(times);
  };

  return (
    <form id="schedulesForm" onSubmit={(event) =>handleSubmit(event)} method="POST" style={styles.formContainer}>
      <Link to="/Dashboard/ScheduleManager" style={styles.goBack}>Go Back</Link>
      <div style={styles.inputContainer}>
        <label htmlFor="stopId" style={styles.Typography}>Stop Name:</label>
        <input type="text" ref={StopNameRef} id="routeId" name="routeId" required style={styles.inputField}/>

        <label htmlFor="busId" style={styles.Typography}>Bus Name:</label>
        <input type="text" ref={BusNameRef} id="busId" name="busId" required style={styles.inputField}/>
        
        <label style={styles.Typography}>Departure Times:</label>
        <button type="button" onClick={handleAddDeparture}>Add Time</button>
        <div style={styles.departureTimesContainer}>
        {departureTimes.map((time, index) => (
          <div key={index} style={styles.formGroup}>
            <input
              type="time"
              value={time}
              onChange={event => handleDepartureChange(index, event)}
              required
              style={styles.inputField}
            />
            <button type="button" onClick={() => handleRemoveDeparture(index)}>Remove Time</button>
          </div>
        ))}
        </div>
      </div>

      <button type="submit" style={styles.addButton}>Add Schedule</button>
    </form>
  );
}

export default SchedulesForm


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
    },
    departureTimesContainer:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }
  