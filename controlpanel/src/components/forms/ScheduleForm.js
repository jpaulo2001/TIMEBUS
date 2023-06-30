import React, { useState, useRef, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faClock} from '@fortawesome/free-solid-svg-icons'

function SchedulesForm() {
  const navigate = useNavigate();

  const [departureTimes, setDepartureTimes] = useState([""]);
  const [stops, setStops] = useState([]);
  const [buses, setBuses] = useState([]);

  const scheduleIdRef = useRef();
  const StopNameRef = useRef();
  const BusNameRef = useRef();

  useEffect(() => {
    fetchStops();
    fetchBuses();
  }, []);

  const fetchBuses = () => {
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:4000/api/buses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setBuses(data))
    .catch(err => console.log(err));
  }

  const fetchStops = () => {
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:4000/api/stops',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setStops(data))
      .catch((err) => console.log(err));
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let schedule = {
      scheduleID     : scheduleIdRef.current.value,
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
      <Link to="/Dashboard/ScheduleManager" style={styles.goBack}><FontAwesomeIcon icon={faArrowLeft}/> Go Back</Link>
      <div style={styles.inputContainer}>
        <label style={styles.Typography}>ScheduleID:</label>
        <input type="text" ref={scheduleIdRef} required style={styles.inputField}/>

        <label style={styles.Typography}>Stop Name:</label>
        <select ref={StopNameRef} required style={styles.inputField}>
          <option value="">Select a Stop...</option>
          {stops.map((stop) => <option value={stop.stopName}>{stop.stopName}</option>)}
        </select>

        <label style={styles.Typography}>Bus Name:</label>
        <select ref={BusNameRef} style={styles.inputField}>
          <option value="">Select a Bus...</option>
          {buses.map((bus) => <option value={bus.busName}>{bus.busName}</option>)}
        </select>

        <label style={styles.Typography}>Departure Times:</label>
        <button type="button" onClick={handleAddDeparture}>Add Time</button>
        <div>
          {departureTimes.map((time, index) => (
            <div key={index}>
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
      <button type="submit" style={styles.addButton}><FontAwesomeIcon icon={faClock}/> Add Schedule</button>
    </form>
  );
}

export default SchedulesForm


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