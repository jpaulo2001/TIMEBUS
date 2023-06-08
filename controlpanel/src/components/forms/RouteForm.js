import React, { useState } from "react";
import {Link} from "react-router-dom"

function RoutesForm() {
  return (
    <form id="routesForm" action="your-api-url-here" method="POST" style={styles.formContainer}>
      <Link to="/Dashboard/RouteManager" style={styles.goBack}>Go Back</Link>
      <div style={styles.inputContainer}>
        <label htmlFor="routeNumber" style={styles.Typography}>Route Number:</label>
        <input type="text" id="routeNumber" name="routeNumber" required style={styles.inputField}/>
        <label style={styles.Typography}>Stops:</label>
        
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