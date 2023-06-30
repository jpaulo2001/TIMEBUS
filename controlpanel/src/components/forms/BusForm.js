import React, { useRef, useState, useEffect }  from "react";
import {Link, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faBus} from '@fortawesome/free-solid-svg-icons'

function BusForm() {
  const navigate = useNavigate();

  const [routes, setRoutes] = useState([]);

  useEffect(() => {fetchRoutes()}, []);

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
      <Link to="/Dashboard/BusManager" style={styles.goBack}><FontAwesomeIcon icon={faArrowLeft}/> Go Back</Link>
      <div style={styles.inputContainer}>
        <label htmlFor="busName" style={styles.Typography}>Bus Name:</label>
        <input ref={busNameRef} type="text" id="busName" name="busName" required style={styles.inputField}/>
      
        <label htmlFor="routeName" style={styles.Typography}>Route Name:</label>
        <select ref={busRouteRef} id="busRoute" name="busRoute" required style={styles.inputField}>
          <option value="">Select a route...</option>
          {routes.map((route, index) => <option key={index} value={route.routeNumber}>{route.routeNumber}</option>)}
        </select>

      
        <label htmlFor="capacity" style={styles.Typography}>Capacity:</label>
        <input ref={capacityRef} type="number" id="capacity" name="capacity" required style={styles.inputField}/>

        <label htmlFor="isAvailable" style={styles.Typography}>Available:</label>
        <select ref={isAvailableRef} id="isAvailable" name="isAvailable" required style={styles.inputField}>
          <option value="">Select...</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    <button type="submit" style={styles.addButton}><FontAwesomeIcon icon={faBus}/> Add Bus</button>
  </form>
  );
}

export default BusForm;

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
