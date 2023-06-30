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
    document.body.style.overflow = 'hidden';
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

    return () => {
      map.remove();
      document.body.style.overflow = 'auto';
    }
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
      <div style={styles.inputContainer}>
        <Link to="/Dashboard/StopManager" style={styles.goBack}><FontAwesomeIcon icon={faArrowLeft}/> Go Back</Link>
        <label htmlFor="stopName" style={styles.Typography}>Stop Name:</label>
        <input type="text" ref={stopNameRef} required style={styles.inputField}/>
        <label htmlFor="lat" style={styles.Typography}>Latitude:</label>
        <input type="text" ref={latRef} style={styles.inputField}/>
        <label htmlFor="lng" style={styles.Typography}>Longitude:</label>
        <input type="text" ref={lngRef} style={styles.inputField}/>
        <button type="submit" style={styles.addButton}><FontAwesomeIcon icon={faThumbtack}/> Add Stop</button>
      </div>
      <div ref={mapContainer} style={styles.mapContainer} />
    </form>
  );
}

export default StopForm

const styles = {
  formContainer: {
    margin: '0.2rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1%',
    backgroundColor: '#bde0fe',
    border: '2px solid black',
    borderRadius: '15px',
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
    width: '10%',
    padding: '1rem',
    background: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',

  },
  inputField: {
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    fontFamily: 'American Typewriter',
    height: '5vh'
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
    border: 'black 1px solid',
  },
  mapContainer: {
    width: "80vw",
    height: "45vw",
    overflow: 'hidden',
    position: "absolut"
  },
}
