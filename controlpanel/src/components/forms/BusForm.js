import React from "react";

function BusForm() {
  return (
    <form id="busForm" action="your-api-url-here" method="POST" style={styles.formContainer}>
      <div style={styles.inputContainer}>
        <label for="busName" style={styles.Typography}>Bus Name:</label>
        <input type="text" id="busName" name="busName" required style={styles.inputField}/>
      
        <label for="busRoute" style={styles.Typography}>Bus Route:</label>
        <input type="text" id="busRoute" name="busRoute" required style={styles.inputField}/>
      
        <label for="capacity" style={styles.Typography}>Capacity:</label>
        <input type="number" id="capacity" name="capacity" required style={styles.inputField}/>

        <label for="isAvailable" style={styles.Typography}>Available:</label>
        <select id="isAvailable" name="isAvailable" required>
          <option value="">Select...</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <button type="submit" style={styles.addButton}>Add Bus</button>
    </form>
  );
}

export default BusForm

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
}