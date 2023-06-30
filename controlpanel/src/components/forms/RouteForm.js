import React, { useRef, useEffect, useState } from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faRoute} from '@fortawesome/free-solid-svg-icons'

function RoutesForm() {

  const navigate = useNavigate();
  const [stops, setStops] = useState([]);
  const [selectedStopsIndex, setSelectedStopsIndex] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:4000/api/stops', {  // replace this with your stops API endpoint
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setStops(data))
    .catch(err => console.log(err));
  }, []);

  const routeNumberRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault()
    let route = {
      routeNumber: routeNumberRef.current.value,
      stops: selectedStopsIndex.map(index => stops[index].stopName)
    };
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:4000/api/routes',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(route)
      }).then(() => {navigate('/Dashboard/RouteManager')}).catch((err) => console.log(err));
  }

  const handleStopCB = (index, event) => {
    if(event.target.checked){
      //novo array com os elementos antigos mais o index no fim (equivalente de um .push)
      setSelectedStopsIndex([...selectedStopsIndex, index]);
    }else{
      //criamos um novo array com elementos que passam o teste (portanto todos que sao diferentes do index da cb que carregamos)
      setSelectedStopsIndex(selectedStopsIndex.filter((stopIndex) => stopIndex !== index));
    }
  }
  //need to be able to add stops (maybe with google maps api?)
  return (
    <form id="routesForm" onSubmit={(event) => handleSubmit(event)} method="POST" style={styles.formContainer}>
      <Link to="/Dashboard/RouteManager" style={styles.goBack}><FontAwesomeIcon icon={faArrowLeft}/> Go Back</Link>
      <div style={styles.inputContainer}>
        <label style={styles.Typography}>Route ID:</label>
        <input type="text" ref={routeNumberRef} style={styles.inputField}/>
        <label style={styles.Typography}>Stops:</label>
        <ul style={styles.inputField}>
          {stops.map((stop ,index)=>{return(
            <div key={index}>
              <li style={styles.Typography}><input style={styles.Typography} onChange={(event) => handleStopCB(index, event)} type="checkbox"/>{stop.stopName}</li>
            </div>
          );})}
        </ul>
      </div>

      <button type="submit" style={styles.addButton}><FontAwesomeIcon icon={faRoute}/> Add Route</button>
    </form>
  );
}

export default RoutesForm

const styles = {
    formContainer:{
      margin: '0.5rem',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '2px dashed black',
      borderRadius:'5px',
      backgroundColor: '#bde0fe',
      padding: '5%'
    },
    Typography:{
      fontSize: '1.5rem',
      fontFamily: 'American Typewriter',
      color: '#464646',
    },
    addButton:{
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
    inputContainer:{
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
      listStyle: 'none'
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