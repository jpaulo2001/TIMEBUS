import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function ScheduleManager() {

  const [schedules, setSchedules] = useState([]);
  const [selection, setSelection] = useState([]);

  const scheduleItem = (schedule, event) =>{
    return (
      <div>
        <a>schedule.stopName</a>
        {schedule.departureTimes.map((time, index)=>{
          
        })}
      </div>
    )
  }

  useEffect(() => {
    fetchSchedules()
    }, []);

  const fetchSchedules = () => {
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:4000/api/schedules',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setSchedules(data))
      .catch((err) => console.log(err));
  }

  const removeSelection = () => {
    const token = localStorage.getItem('jwt');
    selection.forEach((element) => {
      fetch(`http://localhost:4000/api/schedules${element.busName}`,{
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    });
    setSelection([]); // clear selection after removal
    fetchSchedules()
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
        <Link to="/Dashboard/ScheduleForm" style={styles.buttonStyle}>Add Schedule</Link>
        <input type='button' value="Remove" style={styles.buttonStyle} onClick={() => removeSelection()}/>
        </div>
        <ul style={styles.elementsList}>
            {schedules.map((schedule, index)=>(
              <div key={index}>
                <li style={styles.Typography}><input type="checkbox" onChange={handleOnChange}/>Name: {schedule.busName}, Stops: {schedule.stopName}, Time:{schedule.departureTimes} </li>
                <hr style={styles.separatorItem}/>
              </div>
            ))}
        </ul>
      </div>
  );
}

export default ScheduleManager

const styles = {
  formContainer: {
    margin: '5%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderRadius: '30px',
    backgroundColor: '#8ab8a8',
    padding: '5%',
  },
  buttonStyle: {
    backgroundColor: 'green',
    borderRadius: '25px',
    marginTop: '10vh',
    padding: '20px',
    margin: '1vw',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.5rem',
    fontFamily: 'American Typewriter',
    textDecoration: 'none',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease',
  },
  typography: {
    fontSize: '2rem',
    fontFamily: 'American Typewriter',
  },
  addButton: {
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
  inputContainer: {
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
    width: '70vw',
  },
  separatorItem: {
    backgroundColor: 'transparent',
    height: '1px',
    border: 'none',
    borderTop: '1px solid #ccc',
    margin: '10px 0',
  },
  buttonContainerStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '1rem',
  },
}


