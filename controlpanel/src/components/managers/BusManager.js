import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

function BusManager() {
  const [buses, setBuses] = useState([]);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    fetchBuses()
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
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch((err) => console.log(err));
  }

  const removeSelection = () => {
    const token = localStorage.getItem('jwt');
    selection.forEach((element) => {
      fetch(`http://localhost:4000/api/buses/${element.busName}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
    });
    setSelection([]);
    fetchBuses()
  }

  const handleOnChange = (event) => {
    if (event.target.checked) {
      setSelection(prevSelection => [...prevSelection, event.target.parentNode]);
    } else {
      setSelection(prevSelection => prevSelection.filter(sel => sel !== event.target.parentNode));
    }
  }

  return (
    <div style={styles.formContainer}>
      <div style={styles.buttonContainerStyle}>
        <Link to="/Dashboard/BusForm" style={styles.buttonStyle}><FontAwesomeIcon icon={faPlus} />Add Bus</Link>
        <button style={styles.buttonStyle} onClick={() => removeSelection()} ><FontAwesomeIcon icon={faMinus}/>Remove</button>
      </div>
      <table style={styles.elementsList}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Select</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Route</th>
            <th style={styles.tableHeader}>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus, index) => (
            <tr key={index}>
              <td style={styles.tableData}><input type="checkbox" onChange={handleOnChange} /></td>
              <td style={styles.tableData}>{bus.busName}</td>
              <td style={styles.tableData}>{bus.busRoute}</td>
              <td style={styles.tableData}>{bus.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BusManager

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
  typography: {
    fontSize: '2rem',
    fontFamily: 'American Typewriter',
  },
  buttonStyle: {
    backgroundColor: '#219ebc',
    borderRadius: '5px',
    border: '1px solid black',
    padding: '0.5rem',
    margin: '1vw',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    fontFamily: 'American Typewriter',
    textDecoration: 'none',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease',
  },
  buttonContainerStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '70vw',
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
  elementsList: {
    width: '70vw',
    borderCollapse: 'collapse',
    marginTop: '3rem',
    textAlign: 'left',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
  },
  separatorItem: {
    backgroundColor: 'transparent',
    height: '1px',
    border: 'none',
    borderTop: '1px solid #ccc',
    margin: '1rem 0',
  },
    tableHeader: {
    backgroundColor: '#219ebc',
    color: '#fff',
    fontFamily: 'American Typewriter',
    fontSize: '1.5rem',
    padding: '10px',
  },
  tableData: {
    padding: '10px',
    border: '1px solid black',
    fontFamily: 'American Typewriter',
    fontSize: '1.2rem',
  }

}