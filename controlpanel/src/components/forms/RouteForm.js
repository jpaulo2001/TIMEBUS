import React, { useRef, useEffect, useState } from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom"

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
      <Link to="/Dashboard/RouteManager" style={styles.goBack}>Go Back</Link>
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

      <button type="submit" style={styles.addButton}>Add Route</button>
    </form>
  );
}

export default RoutesForm

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
      listStyle: 'none'
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