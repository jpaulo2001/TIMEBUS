import React, { useRef, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faThumbtack} from '@fortawesome/free-solid-svg-icons'
import mapboxgl from 'mapbox-gl';

function StopForm() {
  const mapContainer = useRef(null);
  const navigate = useNavigate();

  const stopNameRef = useRef();
  const latRef = useRef();
  const lngRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicnViZW5zZXJyYWx2YSIsImEiOiJjbGlka3Z5OG8wdGVkM2RuYmV2NXJ2bWM2In0.Q6BEC42wrGzQei_IzqEkAQ';
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-25.684042880880146,37.75310617939103],
      zoom: 10
    });

    // click event
    map.on('click', function(e) {
      const { lng, lat } = e.lngLat;
      
      latRef.current.value = lat;
      lngRef.current.value = lng;

      new mapboxgl.Marker({ "color": "#FF0000" })
      .setLngLat([lng, lat])
      .addTo(map);
    });

    return () => map.remove();
  }, []);


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
      <div ref={mapContainer} style={styles.mapContainer} />
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
  },
  mapContainer: {
    width: "100rem",
    height: "100rem",
    overflow: 'hidden',
    position: "relative"
  },
}
